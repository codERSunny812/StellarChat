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
    
    let statusImgPath, statusImg;

    if(req.file){
        console.log("photo is start uploading  on the cloudinary");
        statusImgPath = req.file.path;
        try {
            console.log("trying to upload the file on the cloudinary");
            statusImg = await connectCloudinary(statusImgPath); //image is sent to the cloudinary

            //remove the image from the local too
            await fs.unlink(statusImgPath);
        } catch (error) {
            console.log("error in uploading the file on cloudinary")
        }
    }

    // storing the data into the storymodal
    const userStatus = new statusModal({ userId, statusImg });

    await userStatus.save();

    res.status(201).json({ message: 'Status uploaded successfully', status: newStatus });

} catch (error) {
    console.log("error in uploading the  files");
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