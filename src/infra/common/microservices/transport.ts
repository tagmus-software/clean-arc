export abstract class Transport<T = unknown> {
    constructor(protected configuration?: T) {}
    abstract connect<C = any>(): Promise<C>;
    abstract listen(): Promise<void>;
}
