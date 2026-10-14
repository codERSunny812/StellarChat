const multer = require("multer");
const path = require("path");
const fs = require("fs");

console.log("multer is running");

// absolute path, so it works no matter which folder the server is started from
const uploadDir = path.join(__dirname, "..", "Public", "Images");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

module.exports = upload;