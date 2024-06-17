const express = require('express');
const upload = require('../utility/MulterConfig');
const { connectCloudinary } = require('../utility/Cloudinary.integrate');
const fs = require('fs/promises');
const statusModal = require('../models/status.modal');

const router = express.Router();


router.get('/status',(req,res)=>{
    res.send('welcome to the home route  of the story upload');
});

// route to upload the status
router.post('/status/upload', upload.single('status-image'),async(req,res)=>{
try {
    console.log("inside the status upload route");
    const {userId} = req.body;
    console.log(req.body);
    console.log(req.file)
    
    let statusImgPath, statusImg;

    if(req.file){
        console.log("photo is start uploading  on the cloudinary");
        statusImgPath = req.file.path;
        try {
            console.log("trying to upload the file on the cloudinary");
            statusImg = await connectCloudinary(statusImgPath); //image is sent to the cloudinary
            console.log("file is successfully uploaded on cloudinary")

            //remove the image from the local too
            await fs.unlink(statusImgPath);
        } catch (error) {
            console.log("error in uploading the file on cloudinary")
        }
    }

    const statusImgLink = statusImg.secure_url;

    console.log("storing the data into the DB");

    // storing the data into the storymodal
    const userStatus = statusModal.create({ userId, statusImg:statusImgLink });

    // await userStatus.save();

    console.log("data saved successfully into the DB");

    res.status(201).json({ message: 'Status uploaded successfully', status: userStatus });

} catch (error) {
    console.log("error in uploading the status");
    res.status(500).json({ error: 'Failed to upload status' });
}


});


// route to view the status
router.get('/status/view-status',async(req,res)=>{
    try {
        console.log("inside the view status route");

        const viewedStatus = await statusModal.find().populate('userId', 'username');
        
        res.status(200).json({
            data:viewedStatus,
            message:"this is the viewed status"
        })

    } catch (error) {
        res.send(404).json({
            message:"error in showing the data",
            error: 'Failed to retrieve statuses' 
        })
    }

});



module.exports=router;