import { HttpStatus, RequestHandler, AppResponse } from "@clean-arc/common";
import { Request, Response as ExpressResponse, NextFunction } from "express";

function isResponseStringOrPlainObject(
    response: AppResponse | object | string
) {
    return (
        !(response instanceof AppResponse) ||
        !("body" in response && "status" in response)
    );
}
export function routeController(handler: RequestHandler) {
    return async (req: Request, res: ExpressResponse, next: NextFunction) => {
        try {
            let response = await handler({
                body: req.body,
                query: req.query,
                headers: req.headers as any,
                params: req.params,
                url: req.url,
            });

            if (isResponseStringOrPlainObject(response)) {
                response = new AppResponse({
                    status: HttpStatus.OK,
                    body: response,
                });
            }

            if (response.headers) {
                Object.entries<string>(response.header).forEach(
                    ([key, value]) => res.setHeader(key, value)
                );
            }
            res.status(response.status).json(response.body);
        } catch (error) {
            next(error);
        }
    };
}
