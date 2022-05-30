import connection from '../database.js';
import categorySchema from '../schemas/categorySchema.js';

export async function getCategory (req, res) {

    try {

        const result = await connection.query(`
        
            SELECT * FROM categories
        
        `);

        res.send(result.rows);

    } catch (e) {

        res.send(e).status(500);

    }

}

export async function insertCetegory (req, res) {

    try {

        const category = req.body;
        const validateCategory = categorySchema.validate(category);

        if (validateCategory.error) {

            return res.sendStatus(400);

        }

        const result = await connection.query(`
        
            SELECT id FROM categories WHERE name=$1
        
        `, [category.name]);

        if (result.rowCount > 0) {

            return res.sendStatus(409);

        }

        await connection.query(`
        
            INSERT INTO categories(name) VALUES ($1)
        
        `, [category.name]);

        res.sendStatus(201);

    } catch (e) {

        res.send(e).status(500);

    }

}