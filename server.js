const express = require("express");
const app = express();
const path = require("path");
const uploadRouter = require("./Routes/uploadRouter");
//sql config
const pool = require("./configs/sqlconfig");
const PORT = 3000;

//Parse for the request body
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

app.listen(PORT, () => {
  console.log("App listening on port http://localhost:3000 !");
});
