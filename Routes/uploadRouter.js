const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "../public/data/uploads/" });
const path = require("path");
const uploadRouter = express.Router();
const cloudinary = require("../cloudinary");
const pool = require("../sqlconfig");
const fs = require("fs");

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

// The From with the post request to push inot our .json file
uploadRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../upload.html"));
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
uploadRouter.post("/", upload.single("mainImage"), (req, res) => {
  //uploadImage is a funktion from above
  uploadImage(req.file.path)
    .then((url) => {
      const { title, description, ingredients, instructions } = req.body;
      //querry for puting data into the recepies table
      pool.query(
        `INSERT INTO recepies (title,description,ingredients,instructions,img_url) VALUES ('${title}','${description}','${ingredients}','${instructions}','${url}')`,
        (err) => {
          if (err) throw err;
        }
      );
    })
    .then(() =>
      //deletes the file which gets created for the image upload afterwards
      fs.unlink(req.file.path, (err) => {
        if (err) throw err;
        console.log(`file ${req.file.path} deleted`);
      })
    )
    .then(res.status(201))
    .then(res.send(`uploaded`));
});

module.exports = uploadRouter;
