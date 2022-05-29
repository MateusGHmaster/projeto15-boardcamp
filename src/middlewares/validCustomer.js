import customerSchema from '../schemas/customerSchema.js';

export function validCustomer (req, res, next) {

    const customer = req.body;
    
    const validate = customerSchema.validate(customer, { abortEarly: false });

    if (validate.error) {

        return res.send(validate.error).status(400);

    }

    next();

}