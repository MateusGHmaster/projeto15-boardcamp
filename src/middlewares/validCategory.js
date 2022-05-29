import categorySchema from '../schemas/categorySchema.js';

export function validCategory (req, res, next) {

    const category = req.body;
    
    const validate = categorySchema.validate(category, { abortEarly: false });

    if (validate.error) {

        return res.send(validate.error).status(400);

    }

    next();

}