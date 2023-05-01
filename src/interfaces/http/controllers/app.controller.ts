import { AppService } from "@app/services";
import { Request, Response } from "express";

export function get(req: Request, res: Response) {
  const data = AppService.helloWord();
  res.json(data);
}
