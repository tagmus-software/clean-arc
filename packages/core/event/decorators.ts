import { buildConsumerHandler } from "./build";
import { consumersMap } from "./constants";

export function MessagePattern(pattern: string) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        buildConsumerHandler(target.consumersOptions, {
            eventName: pattern,
            target,
            propertyKey,
            callback: descriptor.value,
        });
    };
}

export function EventConsumer(options?: any) {
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            consumersOptions = options;
        };
    };
}
