import { AppService } from "@app/services";
import { NextFunction, Request, Response } from "express";

export async function get(req: Request, res: Response) {
    const data = AppService.helloWord();
    res.json(data);
}
