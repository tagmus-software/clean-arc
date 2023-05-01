export class GenericError extends Error {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(msg: any) {
        super(msg);
    }
}
