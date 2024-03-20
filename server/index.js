// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
require('dotenv').config();
const jwt   = require("jsonwebtoken");
const {connectDatabase} = require('./Database/data_connection')
const cors = require('cors');

// connect to the database
connectDatabase();

// import the files 
const {userModal} = require('./models/UserModal')
const {conversationModal} = require('./models/ConversationModel')
const {messageModal} = require('./models/MessageModal')


const app = express();
// env file import
const port =process.env.PORT;

// middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//home route
app.get('/',(req,res)=>{
    res.send("hello from the server");
});

// registration route
app.post('/api/register', async (req, res, next) => {
    try {
        // taking the data from the front end
        const { fullName, email, password } = req.body;

        console.log("Inside the  register route");

        // checking that the data is present or not
        if ( !fullName || !email || !password ) {

            console.log("something is missing");

            return res.status(400).json({
                status: "403",
                message: "please provide all the details"
            });

        }

        console.log("user already present is checking");

        //checking that the user is already exist or not in the database

        const isAlreadyExist = await userModal.findOne({ email });

        console.log("user is present is checked");

        if (isAlreadyExist) {
            console.log("the  user with this email id is already exists");
            return res.status(400).json({
                status: "400",
                message: "user already exist"
            });
        }


        console.log("password hashing start");
        // Hashing the password before storing it into the database
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("password  hashing  end");


        console.log("creation of the user in the DB started");

        // Creating a new user with hashed password
        const newUser = await userModal.create({
            email: email,
            fullName: fullName,
            password: hashedPassword // Set the hashed password
        });

        console.log("user creation is done in the DB");

        return res.status(200).json({
            status: 'success',
            message: "user register successfully",
            data:newUser

        });

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error , can't register the user at this time"
        });
    }
});


// login route for  login the user 
app.post('/api/login',async(req,res,next)=>{
    try {
        const {email,password}= req.body;

        // checking whether the field are empty or not
        if(!email || !password ){
            return res.status(400).json({
                status:'403',
                message: "Email and password are required"
            })}

            const user = await userModal.findOne({email});

            if(!user){
                res.status(404).json({
                    status:'400',
                    message: "User not found"
                })
            }

            // it will check the user's entered password with the user password which is saved into the database
            const validateUser= await  bcrypt.compare(password,user.password);

            if(!validateUser){
                res.status(401).json({
                    status:"401",
                    message:"email or password is incorrect"
                })
            }
            else{
                // create a token on the sucessfull login of the user 
                const payLoad={
                    userId:user._id,
                    email:user.email
                }

                const JWT_SECRET_KEY =process.env.JWT_SECRET_KEY || "this_is_an_jwt_secret_key";

                jwt.sign(payLoad,JWT_SECRET_KEY,{expiresIn:8400},async (err,token)=>{
                    await  userModal.updateOne({_id : user._id} ,{$set:{token}});
                    user.save();
                    return res.status(200).json({
                        status: 'sucess',
                        message: "user logged in successfully",
                        user:{
                            id:user._id,
                            email:user.email,
                            fullName:user.fullName,
                            token:token

                        },
                    })
                })
                

            }


        
    } catch (error) {
        console.log(`error in logging of the user ${error}`)
    }
});


// conversation route -> to create a new conversation
app.post('/api/conversation',async(req,res)=> {
    try {
        const {senderId,receiverId}= req.body;
        const newConversation = conversationModal({members:[senderId,receiverId]});
        await  newConversation.save() ;
        res.status(200).json({
            status:"completed",
            message: `new Conversation is created`,
            data:newConversation
        })        
    }
    catch(error) {
        console.log(`getting error in the conversation and that is ${error}`)
    }
});


// route to get info about the conversation of a particular user  
app.get('/api/conversation/:userId',async (req,res)=>{ 
    try {
        const userId = req.params.userId;
        const conversation = await  conversationModal.find({ members: {$in:[userId]} });
        const conversationUserData = Promise.all(conversation.map(async(conversation)=>{
            // it will get  the reciever id from the member array whose id is not equal to the senderId
            const receiverId = await conversation.members.find(member=> member!== userId );
            const user = await userModal.findById(receiverId);
            return { user: { email: user.email, fullName: user.fullName, conversationId: conversation._id }};
        }));

        res.status(201).json(await conversationUserData);
    } catch (error) {
        console.log(`getting error in  this ${error}`);
    }
})


// message route for creating a new message
app.post("/api/message", async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId = '' } = req.body;

        if (!senderId || !message) {
            return res.status(400).json({
                status: "403",
                message: "Please fill all the required fields (senderId, message)"
            });
        }

        if (!conversationId && receiverId) {
            console.log("hello from the block 1")
            const newConversation = conversationModal({ members: [senderId, receiverId] });
            await newConversation.save(); // await the saving of the new conversation
            const newMessage = messageModal({ conversationId: newConversation._id, senderId, message });
            await newMessage.save(); // await the saving of the new message
            return res.status(200).json({
                status: "completed",
                message: "New Conversation and Message are created",
                data: { conversationId: newConversation._id, messageId: newMessage._id }
            });
        } else if (conversationId) {
            console.log("hello  from the block 2")
            // If conversationId is provided, save the message to the existing conversation
            const newMessage = messageModal({ conversationId, senderId, message, receiverId });
            await newMessage.save(); // await the saving of the new message
            return res.status(200).json({
                status: "completed",
                message: "Message is sent successfully",
                data: { conversationId, messageId: newMessage._id }
            });
        } else {
            console.log("hello from the block 3");
            return res.status(400).json({
                status: "incomplete",
                message: "Conversation ID or Receiver ID is required"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error in sending the message"
        });
    }
});


// route to get info about the message
app.get('/api/message/:conversationId',async(req,res)=>{
try {
    const conversationId = req.params.conversationId;
    if(!conversationId) return res.json({
        status:"bad",
        message:"conversation id is required"
    })
    const message = await messageModal.find({conversationId});
    const messageUserData = Promise.all(message.map(async(message)=>{
        const user = await userModal.findById(message.senderId);
        return {user:{email:user.email,fullName:user.fullName} , message:message.message}
    }))
    res.status(400).json({
        status:"good",
        message:"these are the message which are recieved by the  user from other users ",
        data:message
    })
    // res.status(400).json(await messageUserData );

} catch (error) {
    console.log(`getting error in fetching the message data of the user`)
}
});


// route to get the info of all the user
app.get('/api/users',async(req,res)=>{
    const user = await userModal.find();
    // if we want only specific data of the user 
    const userData = Promise.all(user.map((userInfo) =>{
        return { userInfo: { email: userInfo.email, fullName: userInfo.fullName, userId: userInfo._id }}
    }));
    // res.status(400).json({
    //     status:'good',
    //     message:"these are the all user ",
    //     data:user
    // })
    res.json(await userData);
})




// starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});