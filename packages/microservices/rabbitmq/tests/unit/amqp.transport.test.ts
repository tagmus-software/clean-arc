import { AmqpTransport } from "../../amqp.transport";
import { AmqpConnectionOptions } from "../../types";

describe("amqp.transport", () => {
    let amqpTransport: AmqpTransport;
    let connectionConnections: AmqpConnectionOptions;

    beforeEach(() => {
        amqpTransport = new AmqpTransport(connectionConnections);
    });

    describe("connect", async () => {
        await amqpTransport.connect();
    });
});
