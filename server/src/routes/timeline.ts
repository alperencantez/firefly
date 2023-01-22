import express from 'express';
import { authenticateToken } from '../middlewares/authToken';
import { TimelineControllers } from '../controllers/timeline';

const router = express.Router();

router.get('/', authenticateToken, TimelineControllers.getLatestBytes);

export default router;
