import { consumersMap } from "./constants";
import { EventConsumerType } from "./types";

export function buildConsumerHandler(
    connection: string,
    consumer: EventConsumerType
) {
    const consumers = consumersMap.get(connection);
    if (!consumers) {
        consumersMap.set(connection, [consumer]);
    } else {
        consumers.push(consumer);
    }
}
