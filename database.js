const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    database: 'node_api'
});

connection.connect(error => {
    if(error) throw error;
    console.log('Database connection successfully');
});


module.exports = connection;