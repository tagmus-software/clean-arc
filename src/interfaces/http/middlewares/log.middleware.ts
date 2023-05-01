import { logger } from "@infra/providers/logger.provider";
import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(
    {
      method: req.method,
      url: req.url,
      origin: req.headers.origin,
      body: req.body,
      query: req.query,
      params: req.params,
    },
    `Requested to ${req.url} `
  );
  next();
};
