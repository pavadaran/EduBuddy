var mysql = require('mysql');
const util = require('util');
require('dotenv').config();

// Config your Database
const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: process.env.DB_CONLIMIT,
    dateStrings: true
}

// Create Database Connection Pool
var pool = mysql.createPool(config);

// Create the query binding
var query = util.promisify(pool.query).bind(pool);

// Check the Database Connection
pool.getConnection(function (err, connection) {
    if (err) {
        console.error("Could not connect to the database");
        console.error(err);
    }
    else {
        console.error("Successfully connected to the database");
        connection.release();
    }
});

module.exports = {
    query
}