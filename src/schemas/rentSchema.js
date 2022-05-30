import Joi from 'joi';

const rentSchema = Joi.object({

    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().required()

});

export default rentSchema;