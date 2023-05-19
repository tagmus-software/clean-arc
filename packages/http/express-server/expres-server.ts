import express from "express";
import { HttpServer } from "@clean-arc/common";

export class ExpressServer implements HttpServer {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    /**
     *
     * @param {express.RequestHandler[]} middlewares
     * @description Set Middlewares in the express app
     */
    public middlewares(
        middlewares: express.RequestHandler[] | express.ErrorRequestHandler[]
    ) {
        middlewares.forEach((middleware) => this.app.use(middleware));
    }

    /**
     *
     * @param {express.Router[]} routes
     * @description Bind routes of express into the express app
     */
    public async routes(routes: express.Router[]) {
        routes.forEach((route) => this.app.use(route));
    }

    /**
     *
     * @param {number} port
     * @description Start express webserver
     */
    async listen(port: number) {
        return new Promise<void>((resolve) => {
            this.app.listen(port, resolve);
        });
    }
}
