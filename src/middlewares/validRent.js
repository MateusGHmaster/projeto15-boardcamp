import rentSchema from '../schemas/rentSchema';

export function validRent (req, res, next) {

    const rent = req.body;
    
    const validate = rentSchema.validate(rent, { abortEarly: false });

    if (validate.error) {

        return res.send(validate.error).status(400);

    }

    next();

}