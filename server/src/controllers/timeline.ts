import { Request, Response } from 'express';
import User from '../models/User';

export class TimelineControllers {
    public static async getLatestBytes(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.body.user.id);
            user != null ? res.status(200).send({ user }) : res.sendStatus(404);
        } catch (er) {
            if (er) res.status(404).send();
        }
    }
}
