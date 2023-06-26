/* eslint-disable @typescript-eslint/no-empty-function */

export class Logger {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private loggerInstance: any, private appendData?: any) {
        if (
            appendData &&
            (typeof this.appendData !== "object" || Array.isArray(appendData))
        ) {
            this.appendData = {
                data: this.appendData,
            };
        }
    }

    public info(data: unknown, msg?: string) {
        this.loggerInstance.info(this.getData(data), msg);
    }
    public error(data: unknown, msg?: string) {
        this.loggerInstance.error(this.getData(data), msg);
    }
    public warn(data: unknown, msg?: string) {
        this.loggerInstance.warn(this.getData(data), msg);
    }
    public debug(data: unknown, msg?: string) {
        this.loggerInstance.debug(this.getData(data), msg);
    }

    public trace(data: unknown, msg?: string) {
        this.loggerInstance.trace(this.getData(data), msg);
    }
    public append(data: any) {
        return new Logger(this.loggerInstance, data);
    }

    private getData(msgData: any) {
        let data = msgData;
        if (!this.appendData) {
            return data;
        }

        if (typeof msgData !== "object" || Array.isArray(msgData)) {
            data = {
                message: msgData,
            };
        }
        return {
            ...data,
            ...this.appendData,
        };
    }
}
