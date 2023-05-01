import { ExampleRepository } from "@app/repositories";
import { NotFoundException } from "@infra/common/http";

export function helloWord() {
    throw new NotFoundException("User not found");
    return ExampleRepository.getAll();
}
