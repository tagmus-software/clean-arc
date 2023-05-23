import { buildConsumerHandler } from "./build";
import { EventOptions } from "./types";

export function MessagePattern(pattern: string) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        process.nextTick(() => {
            const options = Reflect.getMetadata("consumer:options", target);
            buildConsumerHandler({
                options,
                eventName: pattern,
                target,
                propertyKey,
                callback: descriptor.value,
            });
        });
    };
}

export function EventConsumer(options: EventOptions = {}) {
    if (!options.connectionName) {
        options.connectionName = "default";
    }
    return <T extends { new (...args: any[]): {} }>(ctr: T) => {
        if (!options.consumerName) {
            options.consumerName = ctr.name;
        }
        Reflect.defineMetadata("consumer:options", options, ctr.prototype);
    };
}
