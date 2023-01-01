import express from 'express';
import { authenticateToken } from '../middlewares/authToken';
import User from '../models/User';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.body.user.id);
        if (user != null) res.status(200).send({ user });
    } catch (er) {
        if (er) res.status(404).send();
    }
});

export default router;
