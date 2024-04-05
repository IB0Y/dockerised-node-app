const express = require('express');
const database = require('./database');

const PORT = 8100;

const app = express();
app.use(express.json());

/**ROUTES **/
app.get('/heartbeat', (req, res) => {
    res.status(200)
        .json({ status: 'success' });
})

app.get('/', async (req, res) => {
    try {
        const data = await database.query('SELECT * FROM schools');

        res.status(201)
            .json({
                status: 'success',
                data: {
                    message: "Successfully fetched",
                    schools: data?.rows
                }
            });
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({ status: 'error', data: { message: "Server error" } });
    }
})

app.post('/', async (req, res) => {
    const { name, address, email } = req.body;

    try {
        await database.query('INSERT INTO schools (name, address, email) VALUES($1, $2, $3)', [name, address, email]);
        res.status(201)
            .json({
                status: 'success',
                data: {
                    message: "Successfully created"
                }
            });
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({ status: 'error', data: { message: "Server error" } });
    }
})

app.get('/setup', async (req, res) => {
    try {
        await database.query('CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(200) , address VARCHAR(100))');
        res.status(201)
            .json({
                status: 'success',
                data: {
                    message: "Table successfully created"
                }
            });
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({ status: 'error', data: { message: "Server error" } });
    }
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));