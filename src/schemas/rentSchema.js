import Joi from 'joi';

const rentSchema = Joi.object({

    customerId: Joi.number().min(1).required(),
    gameId: Joi.number().min(1).required(),
    daysRented: Joi.number().min(1).required()

});

export default rentSchema;