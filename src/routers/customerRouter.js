import { Router } from 'express';
import { getCustomer, getCustomerById, insertCustomer } from '../controllers/customerContoller';

const customerRouter = Router();

customerRouter.get('/customers', getCustomer);
customerRouter.get('/customers/:id', getCustomerById);
customerRouter.post('/customers', insertCustomer);

export default customerRouter;