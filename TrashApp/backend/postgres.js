// DB CONNECTION
//const { Pool } = require('pg');
require('dotenv').config();


const Pool = require('pg').Pool


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

//REGISTER

const registerUser = (request, response) => {
    const first = request.body.backFname;
    const last = request.body.backLname;
    const email = request.body.backEmail;
    const pass = request.body.backPassword;
    

pool.query("SELECT * FROM users WHERE email = $1", [email], (error, results) => {
    if (error) {
        throw error;
    }

    if (results.rows.length > 0) {
        console.log('email already registered.')
        
    }else {
        pool.query('INSERT INTO users ("email", "password", "firstName", "lastName") VALUES ($1, $2, $3, $4)', [email, pass, first, last], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('User registered successfully.');
        })
    };
});

}
module.exports = {
    registerUser
}