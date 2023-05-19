export type Consumers = Record<string, () => void>;
export abstract class Transport<T = unknown> {
    constructor(protected configuration: T) {}
    abstract connect<C>(): Promise<C>;

    abstract listen(handlers: Consumers): Promise<void>;
}
