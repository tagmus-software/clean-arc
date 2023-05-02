import { HttpStatus, RequestHandler } from "@infra/common/http";
import { Request, Response as ExpressResponse, NextFunction } from "express";

export function routeController(handler: RequestHandler) {
    return async (req: Request, res: ExpressResponse, next: NextFunction) => {
        try {
            let response = await handler({
                body: req.body,
                query: req.query,
                headers: req.headers,
                params: req.params,
                url: req.url,
            });
            if (
                !(response instanceof Response) ||
                !("body" in response && "status" in response)
            ) {
                response = new Response(response, {
                    status: HttpStatus.OK,
                });
            }

            if (response.headers) {
                if (response.headers instanceof Headers) {
                    (response.headers as Headers).forEach((value, key) =>
                        res.setHeader(key, value)
                    );
                } else {
                    Object.entries<string>(response.header).forEach(
                        ([key, value]) => res.setHeader(key, value)
                    );
                }
            }
            res.status(response.status).json(response.body);
        } catch (error) {
            next(error);
        }
    };
}
