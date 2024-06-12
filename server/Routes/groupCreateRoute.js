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
        const {name,array}=req.body;

        // check DB for the Group 
        const group = await groupModal.findOne({name});

        if(group){
            return res.status(400).json({
                message:"A group  with the same name is already exist ! Try changing the name of the group"
            })
        }

        // now create a new group in the DB
        const newGroup = await groupModal.create({})

    } catch (error) {
        console.log(first)
    }
})




module.exports=Router;