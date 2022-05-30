import connection from '../database.js';
import rentSchema from '../schemas/rentSchema.js';

export async function listRent (row) {

    const [ id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee, customerName, gameName, categoryId, categoryName ] = row;

    return {

        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customer: {

          id: customerId,
          name: customerName

        },
        game: {

          id: gameId,
          name: gameName,
          categoryId,
          categoryName

        }

    }

}

export async function getRent (req, res) {

    try {

        let where = '';
        const selection = [];
        const params = [];

        if (customerId) {

            params.push(customerId);
            selection.push(`rentals."customerId"=$${params.length}`);

        }

        if (gameId) {

            params.push(gameId);
            selection.push(`rentals."gameId"=$${params.length}`);

        }

        if (params.length > 0) {

            where += ` WHERE ${selection.join(" AND ")}`;

        }

        const result = await connection.query({
            
            text:
            `
            SELECT rentals.*, customers.name AS customer, games.name, categories.* FROM rentals 
            JOIN customers ON customers.id=rentals."customerId"
            JOIN games ON games.id=rentals."gameId"
            JOIN categories ON categories.id=games."categoryId"
            ${where} 
        
            `, rowMode: 'array'

        }, params);

        res.send(result.rows.map(listRent)).status(201);

    } catch (e) {

        res.send(e).status(500);

    }

}

export async function actualRent (req, res) {

    try {
    
        const rental = req.body;

        const validateRent = rentSchema.validate(rental);

        if (validateRent.error) {

            return res.sendStatus(400);

        }

        const { rowCount: existingCustomer } = await connection.query(`

            SELECT id FROM customers WHERE id=$1

        `, [rental.customerId]);

        if (!existingCustomer) {

            return res.sendStatus(400);

        }
    
        const gameResult = await connection.query(`

            SELECT * FROM games WHERE id=$1

        `, [rental.gameId]);

        if (gameResult.rowCount === 0) {

            return res.sendStatus(400);

        }

        const game = gameResult.rows[0];
    
        const result = await connection.query(`

            SELECT id FROM rentals WHERE "gameId"=$1 AND "returnDate" IS null

        `, [rental.gameId]);
    
        if (result.rowCount > 0) {
            
            if (game.stockTotal === result.rowCount) {
  
                return res.sendStatus(400);
  
            }

        }
    
        const originalPrice = rental.daysRented * game.pricePerDay;

        await connection.query(`

            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, NOW(), $3, null, $4, null); 
          
        `, [rental.customerId, rental.gameId, rental.daysRented, originalPrice]);
    
        res.sendStatus(201);
        
    } catch (e) {

        res.send(e).status(500);

    }

}
