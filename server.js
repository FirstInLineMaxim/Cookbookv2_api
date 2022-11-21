const express = require('express')
const app = express()
const {v4: uuid} = require('uuid')
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello World')
});

// generates a uuid
app.post('/uuid', (req, res) => {
    res.sendStatus(201)
    res.send(uuid())
});

app.listen(PORT, () => {
    console.log('App listening on port http://localhost:3000 !');
});