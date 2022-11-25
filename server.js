const express = require("express");
const cors = require('cors')
const app = express();
const path = require("path");
const uploadRouter = require("./Routes/uploadRouter");
//sql config
const pool = require("./configs/sqlconfig");
const PORT = 3000;

//Parse for the request body
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// The From with the post request to push inot our .json file same as the /content path
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/upload.html"));
});

//Basic displaying of json
app.get("/entries", (req, res) => {
  const data = require("./data/data.json");
  res.json(data);
});

app.use("/upload", uploadRouter);

//GET Request with all our data use example http://localhost:3000/recepies to fetch
app.get("/recepies", (req, res) => {
  pool.query("SELECT * FROM recepies", (err, res2) => {
    if (err) throw err;
    res.send(res2.rows);
    console.log("pool sended database");
  });
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
  console.log("App listening on port http://localhost:3000 !");
});
