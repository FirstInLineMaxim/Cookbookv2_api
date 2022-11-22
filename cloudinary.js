const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dwwm12zrf', 
    api_key: '744777837789432', 
    api_secret: 'yTTsa_MxsuOp1m75OCZs-1VbdkY' 
  });

//   const uploadImage = async (imagePath) => {

//     // Use the uploaded file's name as the asset's public ID and 
//     // allow overwriting the asset with new versions
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     };

//     try {
//       // Upload the image
//       const result = await cloudinary.uploader.upload(imagePath, options);
//       console.log(result);
//       return result.public_id;
//     } catch (error) {
//       console.error(error);
//     }
// };

    //ImageUpload
    // cloudinary.uploader.upload("blob:http://localhost:3000/921e66ab-d638-4ea5-aeb7-5cf182b1f0a6", (error, result)=>{
    //     console.log(result, error);
    //   });

module.exports = cloudinary;