import { HttpResponse, HttpStatusCode } from "../../types/http";

import { HttpMethod } from "../../core/http";
import { InjectedController } from "../../types/injected_controller";
import { Router } from "../../core";
import express from "express";

const router = express.Router();
export function expressRouterAdapter(controller: InjectedController) {
  const routes = Router.getRoutesWithHandler(controller);
  routes.routesWithHandler.forEach((route) => {
    // route.handler.value.call();
    const method: HttpMethod = route.information.httpMethod as HttpMethod;
    const path = route.information.path;
    router[method](path, (req, res) => {
      const result: HttpResponse = route.handler.value.call(
        controller.instance,
        ...[req, res]
      );

      res.status(result.statusCode || HttpStatusCode.OK).json(result.data);
    });
  });

  return {
    prefix: routes.prefix,
    router,
  };
}
