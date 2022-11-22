const express = require("express");
const app = express();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const path = require("path");
const multer  = require('multer')
const PORT = 3000;
// const cloudinary = require("./cloudinary");
const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dwwm12zrf', 
    api_key: '744777837789432', 
    api_secret: 'yTTsa_MxsuOp1m75OCZs-1VbdkY' 
  });

  const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.url;
    } catch (error) {
      console.error(error);
    }
};

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
app.post("/content", (req, res) =>{
  uploadImage("filepathplaceholder").then(url => {
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
      mainImage: url,
    };
    myObject.push(newData);
    const newData2 = JSON.stringify(myObject);
    fs.writeFile("./data/data.json", newData2, (err) => {
      // Error checking
      if (err) throw err;
      console.log("New data added");
    });
  })
});

app.listen(PORT, () => {
  console.log("App listening on port http://localhost:3000 !");
});

/////////////////////
//Getting the Image//
