import { Credentials } from '../firefly.types';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import User from '../models/User';
const bcrypt = require('bcrypt');

export class Auth {
    public static async userSignup(req: Request, res: Response): Promise<void> {
        const credentials: object = await req.body;

        // Controls if there's any missing fields
        if (Object.keys(credentials).length < 4) {
            res.sendStatus(400);
        }

        try {
            await User.create(credentials).then(() => res.sendStatus(201));
        } catch (err: any) {
            // MongoDB Error Code 11000 refers to duplicate key error, read about it using the link below
            // https://congtuanle.medium.com/mongoerror-e11000-duplicate-key-error-collection-695e7e9ccdc4

            if (err.code == 11000) {
                res.status(400).send('Bad request');
            } else {
                console.log(err);
            }
        }
    }

    public static async userLogin(req: Request, res: Response): Promise<void> {
        const credentials: Credentials = await req.body;

        // Controls if there's any missing fields
        if (Object.keys(credentials).length < 2) {
            res.sendStatus(400);
        }

        async function generateAccessToken(id: String, handle: String): Promise<String | void> {
            try {
                const token: String = jwt.sign({ id: id, handle: handle }, process.env.JWT_SECRET, {
                    expiresIn: '7d',
                });
                return token;
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        }

        async function authChecker(query: Object) {
            const user = await User.findOne(query);

            if (user != null) {
                try {
                    const control: boolean = await bcrypt.compare(credentials.password, user.password);
                    control === true
                        ? res.json(await generateAccessToken(user.id, user.handle))
                        : res.json({ message: 'Invalid credentials', status: 404 });
                } catch (err) {
                    throw err;
                }
            } else {
                res.json({ message: 'Invalid credentials', status: 404 });
            }
        }

        // Checks if the given input is an email or a handle but
        // any charachters other than A-Z and 0-9 is banned
        // in handles so a handle cannot contain an "@".
        if (credentials.handleOrEmail.includes('@') == true) {
            authChecker({ email: credentials.handleOrEmail });
        } else {
            authChecker({ handle: credentials.handleOrEmail });
        }
    }
}
