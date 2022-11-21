const express = require('express')
const app = express()
const {v4: uuid} = require('uuid')
const PORT = 3000
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
});

// generates a uuid
app.post('/uuid', (req, res) => {
    const id = uuid()
    const content = req.body
    if(!content){
        console.log(req.body)
        return res.sendStatus(400)
    }
    console.log(req.body)

    res.status(201).json({id:id})
});

app.listen(PORT, () => {
    console.log('App listening on port http://localhost:3000 !');
});