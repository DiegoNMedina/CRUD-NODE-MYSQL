const express = require('express');
const bodyParser = require('body-parser');
const { connection } = require('./database');

// PORT
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());


//Routes
app.get('/', (req, res) => {
    res.send('Welcome');
});

// All customers
app.get('/customers', (req, res) => {
    const sql = 'SELECT * FROM customers';
    connection.query(sql, (err, results) => {
        if(err) throw err;
        if(results.length > 0) {
            res.json(results);
        } else {
            res.send('Not results');
        }
    });
});

// Get a customer
app.get('/customers/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM customers WHERE id= ${id}`;
    connection.query(sql, (err, results) => {
        if(err) throw err;
        if(results.length > 0) {
            res.json(results);
        } else {
            res.send('Not results');
        }
    });
});

// Add Customer
app.post('/add', (req, res) => {
    const sql = 'INSERT INTO customers SET ?';
    const customerObject = {
        name : req.body.name,
        city : req.body.city
    }
    connection.query(sql, customerObject, err => {
        if(err) throw err;
        res.send('Customer Created');
    });
});

// Update Customer
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, city } = req.body;
    const sql = `UPDATE customers SET name = '${name}', city = '${city}' WHERE id = ${id}`;
    connection.query(sql, err => {
        if(err) throw err;
        res.send('Customer Updated');
    }); 
});

// Delete Customer
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM customers WHERE id = ${id}`;
    connection.query(sql, err => {
        if(err) throw err;
        res.send('Customer Deleted');
    }); 
});

app.listen(PORT, () => console.log('Server on port', PORT));