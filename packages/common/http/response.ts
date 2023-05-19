import { HttpStatus } from "./status";

export class AppResponse<T = unknown> {
    body: T;
    headers?: Record<string, string>;
    status?: HttpStatus;

    constructor({ body, headers, status }: AppResponse<T>) {
        this.body = body;
        this.status = status || HttpStatus.OK;
        this.headers = headers;
    }
}
