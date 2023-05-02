import express from "express";
import { AppController } from "../controllers";
import { routeController } from "../adapters/express-route-controller.adapter";

const appRouter = express.Router();
appRouter.get("/", routeController(AppController.get));
appRouter.put("/", routeController(AppController.put));
appRouter.post("/", routeController(AppController.post));
appRouter.get("/error", routeController(AppController.errorHandlingExample));

export default appRouter;
