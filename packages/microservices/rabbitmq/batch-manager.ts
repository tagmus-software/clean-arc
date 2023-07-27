import { RabbitMqBatchMessage, RabbitMqBatchOptions, RabbitMqMessage } from ".";

export class BatchManager {
    private batchList: RabbitMqBatchMessage[] = [];
    protected timeout: NodeJS.Timeout;
    protected batchTimeWait: RabbitMqBatchOptions["batchTimeWait"];
    protected batchSize: number;
    protected enabled: RabbitMqBatchOptions["enabled"];

    constructor(options: RabbitMqBatchOptions) {
        this.batchTimeWait = options.batchTimeWait || 500;
        this.batchSize = options.batchSize;
        this.enabled = options.enabled;
    }

    get firstBatch() {
        return this.batchList[0];
    }

    get lastBatch() {
        return this.batchList[this.batchList.length - 1];
    }

    public hasBatchReady() {
        return this.firstBatch?.isBatchReady();
    }

    public addBatch(batch: RabbitMqBatchMessage) {
        this.batchList.push(batch);
    }

    public getAndRemoveBatch() {
        return this.batchList.shift() as RabbitMqBatchMessage;
    }

    public incrementBatchMessage(msg: RabbitMqMessage, queueName: string) {
        clearTimeout(this.timeout);

        if (!this.batchList.length || this.lastBatch?.isBatchReady()) {
            this.addBatch(
                new RabbitMqBatchMessage({
                    batchSize: this.batchSize,
                    queueName: queueName,
                    enabled: this.enabled,
                    batchTimeWait: this.batchTimeWait,
                })
            );
        }

        this.lastBatch.accumulateMessage(msg);
    }

    public async dispatch(callback: () => Promise<void>) {
        await callback();
    }
    public async timeoutDispatch(callback: () => Promise<void>) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.dispatch(callback);
        }, this.batchTimeWait);
    }
}
