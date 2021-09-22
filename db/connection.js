const mysql = require('mysql2');
require('dotenv').config();

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = conn;