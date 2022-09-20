import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'Cowl@ndm@n1'
});

export default pool.promise();

//Should change the password to an environment variable so it's not visible