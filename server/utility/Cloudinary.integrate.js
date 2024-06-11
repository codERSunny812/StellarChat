const { v2 } = require("cloudinary");
const fs = require("fs/promises");

// cloudinary confugiration
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});


// function to upload the photo on the cdn server
exports.connectCloudinary = async (localFilePath) => {
  try {
    console.log("inside the connectCloudinary try block");


    if (!localFilePath) return null;

    //upload the file on the cloudinary server
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("file is successfully uploaded");
    console.log(`url is ${response.url}`);

    return response;
  } catch (error) {

    console.log("getting error in upload the image")
    //as the operation got faild then it will remove the file
    await fs.unlink(localFilePath);

    return null;
  }
};
