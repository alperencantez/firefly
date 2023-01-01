import { Router } from 'express';
import timeline from './timeline';
import byte from './byte';
import auth from './auth';

const router = Router();

router.get('/', (req, res) => res.end());
router.use('/auth', auth);
router.use('/timeline', timeline);
router.use('/byte', byte);

export default router;
