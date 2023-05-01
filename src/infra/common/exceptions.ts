export class GenericError extends Error {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(msg: any, protected statusCode?: number | string) {
        super(msg);
    }

    getBody() {
        return {
            statusCode: this.statusCode,
            data: {
                message: this.message,
            },
        };
    }
}
