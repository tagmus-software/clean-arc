import { NextFunction, Request, RequestHandler, Response } from "express";

export function routeController(handler: RequestHandler) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}
