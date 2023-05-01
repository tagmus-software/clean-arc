import { AppService } from "@app/services";
import { Request, Response } from "express";

export async function get(req: Request, res: Response) {
  const data = await AppService.helloWord();
  res.json(data);
}
