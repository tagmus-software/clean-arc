import { GenericError } from "@infra/common/exceptions";
import { ServerErrorException } from "@infra/common/http";
import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    let responseBody = new ServerErrorException().getBody();
    if (err instanceof GenericError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        responseBody = err.getBody() as any;
    }

    res.status(responseBody.statusCode).json(responseBody.data);
};
