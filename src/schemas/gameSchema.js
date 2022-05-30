import Joi from 'joi';

const gameSchema = Joi.object({

    name: Joi.string().min(3).required(),
    image: Joi.string().uri().required(),
    stockTotal: Joi.number().min(1).required(),
    categoryId: Joi.number().min(1).required(),
    pricePerDay: Joi.number().required()

});

export default gameSchema;