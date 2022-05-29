import gameSchema from '../schemas/gameSchema.js';

export function validGame (req, res, next) {

    const game = req.body;
    
    const validate = gameSchema.validate(game, { abortEarly: false });

    if (validate.error) {

        return res.send(validate.error).status(400);

    }

    next();

}