import { AppRequest, HttpStatus, NotFoundException } from "@infra/common/http";

export async function get(appRequest: AppRequest) {
    const data = "Hello world";
    return data;
}

export async function put({ body }: AppRequest) {
    const data = "Hello world";
    return {
        body: data,
        status: HttpStatus.OK,
    };
}

export async function post({ body }: AppRequest) {
    const data = "Hello world";
    return new Response(data, {
        status: HttpStatus.CREATED,
    });
}

export async function errorHandlingExample({ body }: AppRequest) {
    throw new NotFoundException();
}
