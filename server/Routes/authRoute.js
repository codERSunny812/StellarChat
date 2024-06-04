const express = require("express");
const router = express.Router();
// const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModal } = require("../models/UserModal");
const { connectCloudinary } = require("../utility/Cloudinary.integrate");
const fs = require("fs/promises");
const upload = require('../utility/MulterConfig')

// Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "./Public/Images/Uploads"),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });

// const upload = multer({ storage });

router.get("/register", (req, res) => {
  res.send("hello from  the register");
});

// Registration route
router.post("/register", upload.single("uploaded_file"), async (req, res) => {
  try {

    console.log("inside the Registration route");


    const { fullName, email, password } = req.body;

    let profilePicturePath, imageLink;

    // profile photo is added to the cloudinary

    if (req.file) {
      profilePicturePath = req.file.path;
      try {
        imageLink = await connectCloudinary(profilePicturePath, {
          transformation: [
            { width: 100, height: 100, crop: "fill" },
            { radius: "max" },
          ],
        });

        await fs.unlink(profilePicturePath);
      } catch (cloudinaryError) {
        return res
          .status(500)
          .json({
            message: "Error uploading image to Cloudinary",
            error: cloudinaryError,
          });
      }
    }


    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all the details" });
    }
    

    if (await userModal.findOne({ email })) {
      return res.status(409).json({ message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = {
      email,
      fullName,
      password: hashedPassword,
    };

    if (imageLink && imageLink.secure_url) {
      newUser.image_Id = imageLink.secure_url;
    }

    const createdUser = await userModal.create(newUser);

    console.log("new user is created successfully in the DB");

    res
      .status(201)
      .json({ message: "User registered successfully", data: createdUser });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({
        message: "Internal server error, can't register the user at this time",
        error,
      });
  }
});

// Login route
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
