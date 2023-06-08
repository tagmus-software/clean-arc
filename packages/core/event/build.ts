import { logger } from "../logger";
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
    logger.debug(
        `Building consumer handle - ${consumer.eventName}- ${consumer.options?.consumerName}.${consumer.propertyKey} -  and pushing into consumersMap`
    );

    logger.debug(
        `consumer map size in connection ${consumersMap.size} and in the connection ${connectionName}: ${consumers?.length}`
    );
}
