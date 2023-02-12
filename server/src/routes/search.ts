import { SearchController } from '../controllers/search';
import { authenticateToken } from '../middlewares/authToken';

import express from 'express';

const router = express.Router();

router.post('/', [authenticateToken], SearchController.retrieveAllBytesAndUsers);

export default router;
