import connection from '../database.js';
import customerSchema from '../schemas/customerSchema.js';

export async function getCustomer (req, res) {

    try {

        let where = '';
        const params = [];

        if (cpf) {

            params.push(`${cpf}%`);
            where += `WHERE cpf LIKE $${params.length}`;

        }

        const result = await connection.query(`
        
            SELECT * FROM customers ${where}
        
        `, params);

        res.send(result.rows).status(201);

    } catch (e) {

        res.send(e).status(500);

    }

}

export async function getCustomerById (req, res) {

    const { id } = req.params;

    try {

        const result = await connection.query(`
        
            SELECT * FROM customers WHERE id=$1
        
        `, [id]);

        if (result.rowCount === 0) {

            return res.sendStatus(404);

        }

        res.send(result.rows).status(201);

    } catch (e) {

        res.send(e).status(500);

    }

}

export async function insertCustomer (req, res) {

    try {

        const customer = req.body;

        const validateCustomer = customerSchema.validate(customer);

        if (validateCustomer.error) {

            return res.sendStatus(400);

        }

        const result = await connection.query(`
        
            SELECT id FROM customers WHERE cpf=$1
        
        `, [customer.cpf]);

        if (result.rowCount > 0) {

            return res.sendStatus(409);

        }

        await connection.query(`
        
            INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)
        
        `), [customer.name, customer.phone, customer.cpf, customer.birthday];

        res.sendStatus(201);

    } catch (e) {

        res.send(e).status(500);

    }

}