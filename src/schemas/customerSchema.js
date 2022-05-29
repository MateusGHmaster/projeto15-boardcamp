import Joi from 'joi';

const customerSchema = Joi.object({

    name: Joi.string().min(3).required(),
    phone: Joi.string().min(11).max(11).required(),
    cpf: Joi.string().min(11).max(11).required(),
    birthday: Joi.date().required()
    
});

export default customerSchema;