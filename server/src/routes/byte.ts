import { ByteController } from '../controllers/byte';
import { authenticateToken } from '../middlewares/authToken';
import { postByte } from '../middlewares/postByte';

import express from 'express';

const router = express.Router();

router.post('/new', [authenticateToken, postByte], ByteController.postByte);
router.post('/new-comment', [authenticateToken, postByte], ByteController.commentByte);
router.get('/:handle', [authenticateToken], ByteController.readByteFromProfile);

export default router;
