import { ConsumerHandler } from "@infra/common/consumers";
import { exampleConsumer } from "./example.consumer";

export const CONSUMERS: Record<string, ConsumerHandler> = {
    EXAMPLE_CONSUMER_HANDLER: exampleConsumer,
};
