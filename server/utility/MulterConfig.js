const multer = require("multer");



console.log("multer is running")
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./Public/Images"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage: storage })


module.exports=upload;