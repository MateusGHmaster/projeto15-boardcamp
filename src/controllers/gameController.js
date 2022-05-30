import { connection } from '../database.js';

export async function getGames (req, res) {

    const { name } = req.query;

    try {

        let where = '';
        const params = [];

        if (name) {

            params.push(`${name}%`);
            where += `WHERE games.name ILIKE $${params.length}`;

        }

        const result = await connection.query(`
    
            SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON contegories.id=games."categoryId"${where}

        `, params);

        res.send(result.rows).status(201);

    } catch (e) {

        res.send(e).status(500);

    }

}

export async function insertGame (req, res) {

    try {

        const result = await connection.query(`

            SELECT id FROM categories WHERE id=$1

        `, [game.categoryId]);

        if (result.rowCount === 0) {

            return res.sendStatus(400);

        }

        await connection.query(`
        
            INSERT INTO games(name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)
        
        `, [game.name, game.image, Number(game.stockTotal), game.categoryId, Number(game.pricePerDay)]);

        res.sendStatus(201);

    } catch (e) {

        res.send(e).status(500);

    }

}