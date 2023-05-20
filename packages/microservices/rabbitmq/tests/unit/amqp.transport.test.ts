import { AmqpTransport } from "../../";
import { AmqpConnectionOptions } from "../../types";
jest.unmock("../../amqp.transport");

describe("amqp.transport", () => {
    let amqpTransport: AmqpTransport;
    let connectionOptions: AmqpConnectionOptions;

    beforeEach(() => {
        connectionOptions = {
            name: "default",
            url: "fake_amqp_url",
        };
        amqpTransport = new AmqpTransport(connectionOptions);
    });

    describe("connect", () => {
        test("should create a connection and return ", async () => {
            const connection = await amqpTransport.connect();
            expect(connection).toBeDefined();
            expect(connection.connect).toBeCalledTimes(1);
        });
    });

    // describe("listen", () => {});
});
