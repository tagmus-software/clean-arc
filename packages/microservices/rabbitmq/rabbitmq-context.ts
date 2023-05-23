import { EventContext } from "@clean-arc/core";
import { RabbitMqContextParams } from "./types";

export class RabbitMqContext extends EventContext<RabbitMqContextParams> {
    async publish(data: any) {
        this.context.queue.publish(JSON.stringify(data));
        return true;
    }
    async closeChannel() {
        await this.context.queue.channel.close();
    }

    getFullMessage() {
        return this.context.msg;
    }

    getJsonMessage() {
        return JSON.parse(this.context.msg.bodyString() || "");
    }
}
