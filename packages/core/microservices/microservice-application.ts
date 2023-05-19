import { Transport } from "@clean-arc/common";
import { Application, ApplicationConfiguration } from "../application";

export type MicroserviceConfiguration = ApplicationConfiguration;

export class MicroserviceApplication extends Application {
    private transport: Transport;
    constructor(protected configuration: MicroserviceConfiguration) {
        super(configuration);
    }

    public async setTransport(transport: Transport) {
        this.transport = transport;
    }
    public async listen() {
        await this.transport.connect();
        // this.transport.listen();
    }
}
