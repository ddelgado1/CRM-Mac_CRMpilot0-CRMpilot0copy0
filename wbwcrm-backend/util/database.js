import mysql from 'mysql2';
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'wbw-crm',
    password: 'B0Ad@EGTXAc6'
});

export default pool.promise();

//Should change the password to an environment variable so it's not visible