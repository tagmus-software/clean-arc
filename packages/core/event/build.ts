import { consumersMap } from "./constants";
import { EventConsumerType } from "./types";

export function buildConsumerHandler(consumer: EventConsumerType) {
    const connectionName = consumer.options?.connectionName || "default";
    const consumers = consumersMap.get(connectionName);
    if (!consumers) {
        consumersMap.set(connectionName, [consumer]);
    } else {
        consumers.push(consumer);
    }
}
