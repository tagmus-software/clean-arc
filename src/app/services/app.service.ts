import { ExampleRepository } from "@app/repositories";

export function helloWord() {
    return ExampleRepository.getAll();
}
