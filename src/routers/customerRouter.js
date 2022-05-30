import { Router } from 'express';
import { getCustomer, getCustomerById, insertCustomer } from '../controllers/customerContoller.js';

const customerRouter = Router();

customerRouter.get('/customers', getCustomer);
customerRouter.get('/customers/:id', getCustomerById);
customerRouter.post('/customers', insertCustomer);

export default customerRouter;