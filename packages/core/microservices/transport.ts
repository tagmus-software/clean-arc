import { EventConsumerType, logger } from "@clean-arc/core";

export abstract class Transport<T = unknown, C = any> {
    public connectionName: string;

    protected configuration: T;

    protected _connection: C;

    protected localActiveConsumersMap: Map<string, boolean>;
    constructor(configuration: T) {
        this.configuration = configuration;
        this.localActiveConsumersMap = new Map();
    }

    protected get connection() {
        return this._connection;
    }

    protected set connection(connection) {
        this._connection = connection;
    }

    get isNotConnected() {
        return !this.connection;
    }

    get isConnected() {
        return this.connection != undefined;
    }

    abstract bindConsumer(consumer: EventConsumerType): Promise<void>;
    abstract connect(): Promise<void>;

    setLocalConsumers(consumers: EventConsumerType[]) {
        logger.debug(`setting local ${consumers.length} costumers`);
        consumers.forEach(({ eventName, options }) => {
            logger.debug(
                options,
                `Setting local consumer ${eventName} local active map value passed: ${
                    options?.isActive
                } and value in map: ${options?.isActive ?? true}`
            );

            this.localActiveConsumersMap.set(
                eventName,
                options?.isActive ?? true
            );
        });
    }
}
