const express = require('express');
const { groupModal } = require('../models/group.modal');

const Router = express.Router();


Router.get('/create-group',(req,res)=>{
    res.send('this is the home route to create a group')
})


// api to create the group 
Router.post('/create-group',async(req,res)=>{
    try {
        
        // taking the data from the front end
        const {name,array,userId}=req.body;

        // check DB for the Group 
        const group = await groupModal.findOne({name});

        if(group){
            return res.status(400).json({
                message:"A group  with the same name is already exist ! Try changing the name of the group"
            })
        }

        // now create a new group in the DB
        const newGroup = await groupModal.create({
            name,
            members: [...array, { userId }],

        })

        await newGroup.save();

        res.status(201).json({
            message:"group created successfully",
            data:newGroup
        
        });

    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: 'can not create the  group' });
    }
});


// api to show all the group of the current LoggedIn user
Router.get('/user-group/:userId',async(req,res)=>{

    try {
        
        const {userId} = req.params.userId;

        // Fetch groups where the user is a member
        const groups = await groupModal.find({ 'members.userId': userId });

        res.status(200).json(groups);

    } catch (error) {
        console.log("error in fetching the group")
    }





})




module.exports=Router;