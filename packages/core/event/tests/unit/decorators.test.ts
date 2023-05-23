import { registeredConsumers } from "../../constants";
import { EventConsumer } from "../../decorators";
import { EventConsumerType } from "../../types";

jest.unmock("../../decorators");
jest.unmock("../../constants");

describe("Event decorators", () => {
    describe("eventConsumer", () => {
        test("should push event consumer with the necessary properties to the variable registered consumers ", async () => {
            const fakeFunction = {
                target: jest.fn(),
                propertyKey: "fake_key",
                descriptor: Object.create(null),
            };

            fakeFunction.descriptor.value = jest.fn();

            EventConsumer("user.change")(
                fakeFunction.target,
                fakeFunction.propertyKey,
                fakeFunction.descriptor
            );

            expect(registeredConsumers).toHaveLength(1);
            expect(registeredConsumers).toContainEqual<EventConsumerType>({
                eventName: "user.change",
                callback: fakeFunction.descriptor.value,
                target: fakeFunction.target,
                propertyKey: fakeFunction.propertyKey,
            });
        });
    });
});
