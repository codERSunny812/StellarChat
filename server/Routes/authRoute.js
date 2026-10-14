const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModal } = require("../models/user.modal");
const { connectCloudinary } = require("../utility/Cloudinary.integrate");
const fs = require("fs/promises");
const upload = require("../utility/MulterConfig");



router.get("/register", (req, res) => {
  res.send("hello from  the register");
});

// delete the temporary photo from our server; ignore it if it is already gone
const removeLocalFile = async (filePath) => {
  if (!filePath) return;
  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") console.error("Could not delete temp file:", error.message);
  }
};

//route to register the user
router.post("/register", upload.single("uploaded_file"), async (req, res) => {
  const profilePicturePath = req.file?.path;

  try {
    console.log("inside the Registration route");

    const fullName = req.body.fullName?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    // 1. check the details first, so we don't upload a photo for a request that will fail
    if (!fullName || !email || !password) {
      await removeLocalFile(profilePicturePath);
      return res.status(400).json({ message: "Please provide all the details" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "please select an image to upload" });
    }

    // 2. checking for the user in DB
    if (await userModal.findOne({ email })) {
      await removeLocalFile(profilePicturePath);
      return res.status(409).json({ message: "User already exists" });
    }

    // 3. photo is added on cloudinary server
    console.log("photo is start adding on cloudinary");

    let imageLink;
    try {
      imageLink = await connectCloudinary(profilePicturePath, {
        transformation: [{ gravity: "face", height: 300, width: 300, crop: "thumb" }],
      });
    } catch (cloudinaryError) {
      return res.status(500).json({
        message: "Error uploading image to Cloudinary",
        error: cloudinaryError?.message || String(cloudinaryError),
      });
    } finally {
      // the photo is on the cdn (or the upload failed), so remove it from our server
      await removeLocalFile(profilePicturePath);
    }

    console.log("photo is added on cloudinary");

    // 4. creating a user in the DB
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await userModal.create({
      email,
      fullName,
      password: hashedPassword,
      image_Id: imageLink?.secure_url,
    });

    console.log("new user is created successfully in the DB");

    // never send the password hash back to the browser
    res.status(201).json({
      message: "User registered successfully",
      data: {
        id: createdUser._id,
        email: createdUser.email,
        fullName: createdUser.fullName,
        imageId: createdUser.image_Id,
      },
    });
  } catch (error) {
    await removeLocalFile(profilePicturePath);
    console.error("Error during user registration:", error);
    res.status(500).json({
      message: "Internal server error, can't register the user at this time",
      error: error?.message || String(error),
    });
  }
});

//route for login the user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "No user exist with that email" });
    }

    const user = await userModal.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "this_is_an_jwt_secret_key",
      { expiresIn: 8400 }
    );

    await userModal.updateOne({ _id: user._id }, { $set: { token } });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        token,
        imageId: user.image_Id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Error in logging in the user: ${error}` });
  }
});

module.exports = router;