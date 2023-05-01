import express from "express";
import { AppController } from "../controllers";
import { routeController } from "../adapters/route-controller.adapter";

const appRouter = express.Router();
appRouter.get("/", routeController(AppController.get));

export default appRouter;
