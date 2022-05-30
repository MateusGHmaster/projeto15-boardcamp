import Joi from 'joi';

const customerSchema = Joi.object({

    name: Joi.string().min(3).required(),
    phone: Joi.string().min(10).required(),
    cpf: Joi.string().min(11).max(11).required(),
    birthday: Joi.string().required()
    
});

export default customerSchema;