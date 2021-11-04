export abstract class RestError extends Error {
  public statusCode!: number;
  constructor(message: string) {
    super(message);
  }
}
export class NotFoundException extends RestError {
  statusCode = 404;
}

export class BadRequestException extends RestError {
  statusCode = 400;
}

export class ServerErrorException extends RestError {
  statusCode = 500;
}
