export abstract class EventContext<T = any> {
    constructor(protected context: T) {}

    abstract publishMessage(data: any): Promise<boolean>;
    abstract closeChannel(): Promise<void>;
}
