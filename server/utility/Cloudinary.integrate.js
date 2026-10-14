const { v2 } = require("cloudinary");

// cloudinary confugiration
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

// warn at startup if any key is missing from .env
const missingKeys = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_KEY_SECRET",
].filter((key) => !process.env[key]);

if (missingKeys.length) {
  console.warn(`Cloudinary is not configured, missing in .env: ${missingKeys.join(", ")}`);
}

// function to upload the photo on the cdn server
// throws the real error so the route can report it
exports.connectCloudinary = async (localFilePath, options = {}) => {
  if (!localFilePath) return null;

  try {
    console.log("inside the connectCloudinary try block");

    //upload the file on the cloudinary server
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
      ...options,
    });

    console.log("file is successfully uploaded on cloudinary");

    return response;
  } catch (error) {
    // Cloudinary sometimes throws { error: { message, http_code } } instead of an Error
    const reason =
      error?.message || error?.error?.message || error?.error?.code || String(error);

    // print the real reason (wrong keys, wrong env names, network, etc.)
    console.error("Cloudinary upload failed:", reason);
    throw new Error(reason);
  }
};