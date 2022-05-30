import { Router } from 'express';
import { actualRent, getRent } from '../controllers/rentController.js';

const rentRouter = Router();

rentRouter.get('/rentals', getRent);
rentRouter.post('/rentals', actualRent);
rentRouter.post('/rentals/:id/return',);
rentRouter.delete('/rentals/:id',);

export default rentRouter;