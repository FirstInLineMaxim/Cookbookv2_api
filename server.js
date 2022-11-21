const express = require('express')
const app = express()
const {v4: uuid} = require('uuid')
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(PORT, () => {
    console.log('App listening on port http://localhost:3000 !');
});