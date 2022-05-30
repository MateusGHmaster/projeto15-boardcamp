import categoryRouter from './categoryRouter.js';
import customerRouter from './customerRouter.js';
import gameRouter from './gameRouter.js';
import rentRouter from './rentRouter.js';
import { Router } from 'express';

const routers = Router();

routers.use(categoryRouter);
routers.use(customerRouter);
routers.use(gameRouter);
routers.use(rentRouter);

export default routers;