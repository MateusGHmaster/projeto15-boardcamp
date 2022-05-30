import Joi from 'joi';

const rentSchema = Joi.object({

    customerId: Joi.string().required(),
    gameId: Joi.string().required(),
    daysRented: Joi.string().required()

});

export default rentSchema;