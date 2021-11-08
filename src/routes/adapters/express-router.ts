import { Request, Response } from "express";
import {
  ResponseException,
  ServerErrorRequestException,
} from "../../infra/common/http";

export function expressRouterAdapter(controller: Object, callback: Function) {
  if (!callback) {
    throw new Error(
      `Controller ${controller.constructor.name} method is not defined  `
    );
  }
  return async (req: Request, res: Response) => {
    let result: any;

    try {
      result = await callback.call(controller, {
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (error: ResponseException | any) {
      console.log(error);

      if (error instanceof ResponseException) {
        result = error.getBody();
      } else {
        result = new ServerErrorRequestException(error.message).getBody();
      }
    }
    if (typeof result == "string" || Array.isArray(result)) {
      result = { data: result };
    }
    res.status(result.statusCode || 200).json(result.data || {});
  };
}
