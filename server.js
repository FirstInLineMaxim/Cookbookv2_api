const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
// middle ware for form to recieve req.file
const multer = require("multer");
const upload = multer({ dest: "./public/data/uploads/" });
//id Generator
const { v4: uuid } = require("uuid");
// cloudinary stuff
const cloudinary = require("./cloudinary");
//sql config
const pool = require("./sqlconfig");
const { disconnect } = require("process");

const PORT = 3000;

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
  res.sendFile(path.join(__dirname, "/upload.html"));
});

//Basic displaying of json
app.get("/entries", (req, res) => {
  const data = require("./data/data.json");
  res.json(data);
});

// The From with the post request to push inot our .json file
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "/upload.html"));
});


/**
 * table recepies
 * 	id SERIAL NOT NULL,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	ingredients VARCHAR(255) NOT NULL,
	instructions TEXT NOT NULL,
	img_url VARCHAR NOT NULL,
	PRIMARY KEY (id)
 */

// The Post request who writes to sql database
app.post("/upload", upload.single("mainImage"), (req, res) => {
  // Connect sql server from sqlconfig.js
  pool
    .connect()
    .then(() => console.log("connected"))
    .catch((err) => console.error("connection error", err.stack));

  //uploadImage is a funktion from above
  uploadImage(req.file.path)
    .then((url) => {
      const { title, description, ingredients, instructions } = req.body;
      //querry for puting data into the recepies table also it closes the connection afterwards
      pool.query(
        `INSERT INTO recepies (title,description,ingredients,instructions,img_url) VALUES ('${title}','${description}','${ingredients}','${instructions}','${url}')`,
        (err, res) => {
          if (err) throw err;
          console.log(res.rows);
          pool.end(() => console.log("disconnected"));
        }
      );
    })
    .then(() =>
      //deletes the file which gets created for the image upload afterwards
      fs.unlink(req.file.path, (err) => {
        if (err) throw err;
        console.log(`file ${req.file.path} deleted`);
      })
    );
});

//GET Request with all our data use example http://localhost:3000/recepies to fetch
app.get("/recepies", (req, res) => {
  //connecting to sql server

  pool.query("SELECT * FROM recepies", (err, res2) => {
    if (err) throw err;
    res.send(res2.rows);
    console.log("datasend")
  });
});

app.listen(PORT, () => {
  console.log("App listening on port http://localhost:3000 !");
});
