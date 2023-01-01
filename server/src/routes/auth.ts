import { Auth } from '../controllers/auth';
import express from 'express';

const router = express.Router();

router.post('/signup', Auth.userSignup);
router.post('/login', Auth.userLogin);

export default router;
