/* TODO:
    --> Create a Byte [X]
        >> Some Bytes will be comments but they are still Bytes [X]
        >> Create a Byte with a photo [X]
        >> Create a comment Byte with photo [X]

    --> Read a Byte []
        >> Bytes from a specific user [X]
        >> Bytes from a user's following list []

    --> Update a Byte []
        >> Add an "updated" notifier next to user's handle for
        people to know that it's been edited []

    --> Delete a Byte []
        >> Important: The Byte owner has a privilege to delete all comments
        with their Byte itself []
*/

import { Request, Response } from 'express';
import { Byte } from '../models/Byte';
import { ObjectId } from 'mongoose';
import * as crypto from 'crypto';

export class ByteController {
    // Methods for controllers
    private static async createPost(query: Object): Promise<any> {
        const newByte = await Byte.create(query);
        return newByte;
    }

    private static async checkHasMediaAndCreate(req: Request | any, res: Response) {
        const { image } = req.files;
        // Doesn't allow the upload if submitted file is not an image
        if (!/^image/.test(image.mimetype)) return res.sendStatus(400);

        const imgName: String = crypto.randomBytes(15).toString('hex');

        await image.mv('./public/' + req.body.user.handle + imgName + '.jpg');
        const createdByte = await ByteController.createPost({
            content: req.body.content,
            author: req.body.user.handle,
            media: './public/' + req.body.user.handle + imgName,
        });

        return createdByte;
    }

    // Controller methods about Creating Bytes
    public static async postByte(req: Request | any, res: Response) {
        if (req.query.hasMedia == 'true') {
            await ByteController.checkHasMediaAndCreate(req, res);
            return res.sendStatus(201);
        } else {
            await ByteController.createPost({
                content: req.body.content,
                author: req.body.user.handle,
            });
            return res.sendStatus(201);
        }
    }

    public static async commentByte(req: Request, res: Response) {
        const repliedByte = await Byte.findById(req.body.byteId);

        if (req.query.hasMedia == 'true') {
            const createdCommentMedia = await ByteController.checkHasMediaAndCreate(req, res);
            await repliedByte?.updateOne({ $push: { comments: createdCommentMedia } });

            return res.sendStatus(201);
        }

        const createdComment = await ByteController.createPost({
            content: req.body.content,
            author: req.body.user.handle,
        });
        await repliedByte?.update({ $push: { comments: createdComment } });
    }

    // Controller methods related to Reading Bytes
    public static async readByteFromProfile(req: Request, res: Response) {
        interface IUserBytes {
            _id: ObjectId;
            content: String;
            author: String;
            comments: Array<Object>;
            createdAt: String;
        }

        const userBytes: Array<IUserBytes> = await Byte.where({ author: req.params.handle });
        if (userBytes.length === 0) return res.sendStatus(404);

        return res.json(userBytes);
    }
}
