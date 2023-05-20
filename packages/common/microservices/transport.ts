export type Consumers = Record<string, () => void>;
export abstract class Transport<T = unknown> {
    protected configuration: T;
    constructor(configuration: T) {
        this.configuration = configuration;
    }
    abstract connect<C>(): Promise<C>;

    abstract listen(handlers: Consumers): Promise<void>;
}
