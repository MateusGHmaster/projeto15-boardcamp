import { Router } from 'express';
import { getCategory, insertCetegory } from '../controllers/categoryController.js';

const categoryRouter = Router();

categoryRouter.get('/categories', getCategory);
categoryRouter.post('/categories', insertCetegory);

export default categoryRouter;
