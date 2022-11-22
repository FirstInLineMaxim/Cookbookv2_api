const express = require('express');
const app = express();
const fs = require('fs');
const path =require('path');
const PORT = 3000
/*const stream = fs.createWriteStream('test.json',{flags:'a'})
stream.write(JSON.stringify(req.body)+',') */


app.use(express.json());

/*app.get('/', (req, res) => {
    res.send('Hello World')
});*/

app.get('/', (req,res) => {
fs.readFile('./content.json',(err,data) => {
    if (err) throw err;
    let pcontent = JSON.parse(data);
    res.send(pcontent)})

});



/*app.get('/json', (req,res) => {
    const data = require('./data.json')
    console.log(data);
    
    });*/

app.put('/update', (req,res) => {
let copy = require('./content.json');
let up = req.body
copy.push(up)
copy = JSON.stringify(copy)
fs.writeFile("content.json", copy, err => {
if(err) {
    return console.log(err)
}
res.send('Transfer sucessful')
})


})

app.post('/post', (req,res) => {
    let c = require('./content.json');
res.send(c);


})






app.listen(PORT, () => {
    console.log('App listening on port http://localhost:3000 !');
});