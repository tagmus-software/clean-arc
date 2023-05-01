import express from "express";
import { AppController } from "../controllers";

const appRouter = express.Router();
appRouter.get("/", AppController.get);
