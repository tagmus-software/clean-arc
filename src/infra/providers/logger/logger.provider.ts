/* eslint-disable @typescript-eslint/no-empty-function */

export class Logger {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private loggerInstance: any) {}

    public info(data: unknown, msg?: string) {
        this.loggerInstance.info(data, msg);
    }
    public error(data: unknown, msg?: string) {
        this.loggerInstance.error(data, msg);
    }
    public warn(data: unknown, msg?: string) {
        this.loggerInstance.warn(data, msg);
    }
    public debug(data: unknown, msg?: string) {
        this.loggerInstance.debug(data, msg);
    }
}
