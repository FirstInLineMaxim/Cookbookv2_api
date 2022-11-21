const express = require('express');
const app = express();
const fs = require('fs');
const path =require('path');
const PORT = 3000

app.use(express.json());

/*app.get('/', (req, res) => {
    res.send('Hello World')
});*/

app.get('/', (req,res) => {
fs.readFile('./data.json',(err,data) => {
    if (err) throw err;
    let pcontent = JSON.parse(data);
    res.send(pcontent)})

});



/*app.get('/json', (req,res) => {
    const data = require('./data.json')
    console.log(data);
    
    });*/






app.listen(PORT, () => {
    console.log('App listening on port http://localhost:3000 !');
});