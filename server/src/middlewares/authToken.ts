import { Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

export function authenticateToken(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err: Error, user: any) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.body.user = user;
        next();
    });
}
