import amqp from "amqplib";
import { connectionsMap } from ".";

type AmqpOption = {
    connection: string;
};

export function subscribe({ connection }: AmqpOption & { queue: string }) {
    const conn = connectionsMap.get(connection);
    const channel = conn?.getChannel();
}
