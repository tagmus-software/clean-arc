import { GenericError } from "../exceptions";
import { HttpStatus } from "./status";

export abstract class ResponseException extends GenericError {
    constructor(
        msg: unknown,
        public httpStatusCode: HttpStatus,
        statusCode?: number | string
    ) {
        super(msg, statusCode);
    }

    getBody() {
        return {
            statusCode: this.httpStatusCode,
            data: {
                message: this.message,
            },
        };
    }
}

export class NotAuthorizedException extends ResponseException {
    constructor(msg = "Request is not authorized") {
        super(msg, HttpStatus.UNAUTHORIZED);
    }
}

export class NotFoundException extends ResponseException {
    constructor(msg = "The requested resource was not found") {
        super(msg, HttpStatus.NOT_FOUND);
    }
}

export class BadRequestException extends ResponseException {
    constructor(msg = "The request is badly formed") {
        super(msg, HttpStatus.BAD_REQUEST);
    }
}

export class ServerErrorException extends ResponseException {
    public statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    constructor(msg = "Sorry, internal server error occurred") {
        super(msg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
