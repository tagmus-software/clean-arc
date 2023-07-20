import { Application } from "@clean-arc/core/application";

class Test extends Application {}
describe("application", () => {
    describe("setupLogger", () => {
        test.todo(
            "should call build logger with the right options and override the default options"
        );
        test.todo("should call build logger with the default options");
    });

    describe("setupDatabase", () => {
        test.todo("should setup the test instance properly");
    });

    describe("initDatabasesConnection", () => {
        test.todo("should initiate all the database connections");
        test.todo(
            "should throw an error if one of the database connections failed"
        );
    });
});
