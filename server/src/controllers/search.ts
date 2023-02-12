import { Request, Response } from 'express';
import { Byte } from '../models/Byte';
import User from '../models/User';

export class SearchController {
    public static async retrieveAllBytesAndUsers(req: Request, res: Response) {
        const dontAllowSpaceOnly: RegExp = /^(?!\s+$).+/;
        const query: string = await req.body.query.toString();

        // Users cannot make DB request by sending space chars only
        if (!dontAllowSpaceOnly.test(query)) return res.sendStatus(404);

        // Find bytes & users containing query
        try {
            const matchingBytes: Array<object> = await Byte.find({ content: { $regex: query } }).select({
                createdAt: 0,
                comments: 0,
                _id: 0,
            });

            const matchingUsers: Array<object> = await User.find({ handle: { $regex: query } }).select({
                handle: 1,
                displayName: 1,
                _id: 0,
            });

            return res.json({ bytes: matchingBytes, users: matchingUsers });
        } catch (er: unknown) {
            console.log(er);
            return res.sendStatus(500);
        }
    }
}
