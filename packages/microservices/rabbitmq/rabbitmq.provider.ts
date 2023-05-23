import { EventContext } from "@clean-arc/core";

export class RabbitContext extends EventContext {
    createPublisher(): Promise<(data: any) => Promise<boolean>> {
        throw new Error("Method not implemented.");
    }
    closeChannel(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    createChannel(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
