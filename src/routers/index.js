import categoryRouter from 'categoryRouter.js';
import customerRouter from 'customerRouter.js';
import gameRouter from 'gameRouter.js';
import rentRouter from 'rentRouter.js';
import { Router } from 'express';

const router = Router();

router.use(categoryRouter);
router.use(customerRouter);
router.use(gameRouter);
router.use(rentRouter);

export default router;