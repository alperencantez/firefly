import { NextFunction, Request, Response } from 'express';

export async function postByte(req: Request, res: Response, next: NextFunction) {
    const regex: RegExp = /^(?!\s+$).+/;
    if (!regex.test(req.body.content)) return res.sendStatus(400);

    next();
}
