import Joi from 'joi';

const gameSchema = Joi.object({

    name: Joi.string().min(3).required(),
    image: Joi.string().uri().required(),
    stockTotal: Joi.string().required(),
    categoryId: Joi.string().required(),
    pricePerDay: Joi.string().required()

});

export default gameSchema;