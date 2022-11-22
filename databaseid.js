const express = require("express");
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
 user: 'postgres',
 host: 'localhost',
 database: 'postgres',
 password: '123456',
 port: 5432,
});

app.get("/", (req, res) => {
  pool // We're using the instance connected to the DB
    .query('SELECT * FROM recipe;')
    .then(data => res.json(data.rows)) // We can send the data as a JSON
    .catch(e => console.log(e)); // In case of problem we send an HTTP code
});

app.listen(3020, () => console.log('connected'));
