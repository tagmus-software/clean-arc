import { NotFoundException } from "@infra/common/http";
import { Request, Response } from "express";

export async function get(req: Request, res: Response) {
    const data = "Hello world";
    res.json(data);
}

export async function errorHandlingExample(req: Request, res: Response) {
    throw new NotFoundException("This is an error handled example");

    res.json();
}
