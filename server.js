const express = require("express");
const app = express();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const path = require("path");
const PORT = 3000;
const cloudinary = require("./cloudinary");

//Parse for the request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// The From with the post request to push inot our .json file same as the /content path
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/test.html"));
});

//Basic displaying of json
app.get("/entries", (req, res) => {
  const data = require("./data/data.json");
  res.json(data);
});

// The From with the post request to push inot our .json file
app.get("/content", (req, res) => {
  res.sendFile(path.join(__dirname, "/test.html"));
});

// The Post request who reads and writes to data.json
app.post("/content", (req, res) => {
  //writes files after another into the file. needs {flags :'a'} to work  https://nodejs.org/api/fs.html#file-system-flags
  const data = fs.readFileSync("./data/data.json");
  const myObject = JSON.parse(data);
  const { ...form } = req.body;
  //Just the model for the json data
  const newData = {
    id: uuid(),
    title: form.title,
    description: form.description,
    ingredients: form.ingredients,
    instructions: form.instructions,
    mainImage: form.mainImage,
    ...form,
  };
  // const newData = req.bodyv
  myObject.push(newData);
  const newData2 = JSON.stringify(myObject);
  fs.writeFile("./data/data.json", newData2, (err) => {
    // Error checking
    if (err) throw err;
    console.log("New data added");
  });
  res.status(201);
      cloudinary.uploader.upload("blob:http://localhost:3000/921e66ab-d638-4ea5-aeb7-5cf182b1f0a6", (error, result)=>{
        console.log(result, error);
      });
});

app.listen(PORT, () => {
  console.log("App listening on port http://localhost:3000 !");
});

/////////////////////
//Getting the Image//
