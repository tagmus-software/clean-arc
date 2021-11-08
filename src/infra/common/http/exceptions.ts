import HttpStatus from "./status";

export abstract class ResponseException extends Error {
  public statusCode: HttpStatus;
  constructor(msg) {
    super(msg);
  }

  getBody() {
    return {
      statusCode: this.statusCode,
      data: {
        message: this.message,
      },
    };
  }
}

export class NotAuthorizedException extends ResponseException {
  constructor(msg = "Request is not authorized") {
    super(msg);
    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}

export class NotFoundException extends ResponseException {
  constructor(msg = "The requested resource was not found") {
    super(msg);
    this.statusCode = HttpStatus.NOT_FOUND;
  }
}

export class BadRequestException extends ResponseException {
  public statusCode = HttpStatus.BAD_REQUEST;
  constructor(msg = "The request is bad formed") {
    super(msg);
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}

export class ServerErrorRequestException extends ResponseException {
  public statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(msg = "Sorry, internal server error occurred") {
    super(msg);
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}
