// server.js
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { connectDatabase } = require("./Database/data_connection");
const cors = require("cors");
const {Server} = require('socket.io')
const {createServer} = require('http')
const multer = require('multer');
const {connectCloudinary} = require('./utility/Cloudinary.integrate')


// connecting  to the database
connectDatabase();

// import the modals
const { userModal } = require("./models/UserModal");
const { conversationModal } = require("./models/ConversationModel");
const { messageModal } = require("./models/MessageModal");

const port = process.env.PORT;


const app = express();

const server = createServer(app);

// set up multure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   return cb(null,'./uploads')
  },
  filename: function (req, file, cb) {
  return cb(null,`${Date.now()}-${file.originalname}`);  
  }
})

// initilizing multer
const upload = multer({storage});

// middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//socket server instance 
const io = new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"],
    credentials:true,
  }
})

//connecting  to the entire  socket server 

  // Storing the data of all the connected user in a array

let allConnectedUser = [];


// console.log("the  connected user array is:");
// console.log(allConnectedUser);


io.on("connection",(socket)=>{

// console.log("a new user is connected: ",socket?.id);


//listing to the event
socket?.on("addUser",({id , name})=>{
  // console.log(name);

  // check the user is already present in the array or not.
  const isUserPresent = allConnectedUser.find((user)=> user?.userId === id);

  if(!isUserPresent){

    const user = {
      userId: id,
      userName:name,
      socketId: socket?.id,
      message:"the logged in  user is added in the array"
    }

  //   //save the user details in array 
    allConnectedUser.push(user);

  //   console.log("the value of the arrray after the user login is:");
    // console.log(allConnectedUser);

    // emiting an event to get the data of the added user in the front end page
    io.emit("getUser",allConnectedUser);


  }

  

});

// handling the socket message event
  socket.on("send-message",async({conversationId , senderId , message , receiverId})=>{

  //  check for the receiverId
  // it will check the user Id of the all the people who are present in the array that who have the id equal to receiverId

  const receiver = await allConnectedUser.find((users)=> users?.userId === receiverId);

  const sender = await allConnectedUser.find((users) => users?.userId === senderId);
  
  const user = await userModal.findById(senderId);
  
  // console.log("the value of the receiver is:");
  // console.log(receiver);
  
  // console.log("the value of the sender is:")
  // console.log(sender);

  // console.log("the value which is recieved by the front end is:")

  // console.log(conversationId, senderId , message , receiverId);


  if(receiver){
    io.to(receiver?.socketId).to(sender?.socketId).emit("getMessage",{
      senderId,
      conversationId,
      message,
      receiverId,
      user:{
        id:user?._id,
        fullName:user?.fullName,
        email:user?.email
      }
    })
  }


  });




socket.on('disconnect',()=>{
  allConnectedUser = allConnectedUser.filter((user)=> user.socketId === socket.id);
  io.emit("getUser",allConnectedUser);
});


})

//home route
app.get("/", (req, res) => {
  res.send("hello from the home route");
});

// registration route
app.post("/api/register", upload.single('uploaded_file'),async (req, res, next) => {
  try {

    console.log("registration route");
    // taking the data from the front end

    // console.log(req.file);

    const { fullName, email, password } = req.body;
    const profilePicturePath = req.file.path;

    console.log(req.body);

    console.log(req.file.path);

    const imageLink = await connectCloudinary(profilePicturePath, {
      transformation: [
        { width: 50, height: 50, crop: "fill" },
        { radius: "max" }
      ]
    });


    console.log(imageLink);

   

    // checking that the data is present or not
    if (!fullName || !email || !password) {
      return res.status(100).json({
        status: "100",
        message: "please provide all the details",
      });
    }

    const isAlreadyExist = await userModal.findOne({ email });

   

    if (isAlreadyExist) {
    
      return res.status(204).json({
        status: "204",
        message: "user already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);


    const newUser = await userModal.create({
      email: email,
      fullName: fullName,
      password: hashedPassword, 
      image_Id:imageLink?.secure_url,
    });


    return res.status(200).json({
      status: "success",
      message: "user register successfully",
       data:newUser
    });

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
     
      message: "Internal server error , can't register the user at this time",
    });
  }

});

// login route for  login the user
app.post("/api/login", async (req, res, next) => {
  try {

    console.log("inside the login route");
    
    const { email, password } = req.body;

    console.log(req.body);


    // checking whether the field are empty or not
    if (!email || !password) {
      return res.status(100).json({
        status: "100",
        message: "Email and password are required",
      });
    }

    const user = await userModal.findOne({ email });

    console.log(user);

    if (!user){
      res.status(404).json({
        status: "404",
        message: "User not found",
      });
    }

    // it will check the user's entered password with the user password which is saved into the database

    const validateUser = await bcrypt.compare(password, user.password);

    if (!validateUser) {
      res.status(401).json({
        status: "401",
        message: "email or password is incorrect",
      });
    }
    else {
      // create a token on the sucessfull login of the user
      const payLoad = {
        userId: user._id,
        email: user.email,
      };

      const JWT_SECRET_KEY =
        process.env.JWT_SECRET_KEY || "this_is_an_jwt_secret_key";

      jwt.sign(
        payLoad,
        JWT_SECRET_KEY,
        { expiresIn: 8400 },
        async (err, token) => {
          await userModal.updateOne({ _id: user._id }, { $set: { token } });
          user.save();
          return res.status(200).json({
            status: "sucess",
            message: "user logged in successfully",
            user: {
              id: user._id,
              email: user.email,
              fullName: user.fullName,
              token: token,
              imageId: user.image_Id,
            },
          });
        }
      );
    }
  }
  catch (error) {
    console.log(`error in logging of the user ${error}`);
  }
});

// conversation route -> to create a new conversation btw two people
app.post("/api/conversation", async (req, res) => {
  try {
    
    const { senderId, receiverId } = req.body;

    // let's store the name of the sender and receiver  in the conversation modal
    const senderName = await userModal.findOne({ _id: senderId });
    const receiverName = await userModal.findOne({ _id: receiverId });



    // creating a instance of the conversation
    const newConversation = await conversationModal({
      members: [
        senderId,
        receiverId,
        { senderName: senderName.fullName },
        { receiverName: receiverName.fullName },
      ],
    });

    // saving that into the database
    await newConversation.save();

    // sending back the response
    res.status(200).json({
      status: "completed",
      message: `new Conversation is created between the two user`,
      data: {
        newConversation,
        fullName:receiverName.fullName,
        img:receiverName.image_Id
      },
    });
  }
  catch (error) {
    console.log(`getting error in the conversation and that is ${error}`);
  }
});


// route to get info about the all conversation of any user using the his id
app.get("/api/conversation/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const conversation = await conversationModal.find({
      members: { $in: [userId] },
    });

    // console.log(conversation);

    const conversationUserData = await Promise.all(
      conversation.map(async (conversation) => {
        // it will get  the reciever id from the member array whose id is not equal to the senderId
        const receiverId = await conversation.members.find(
          (member) => member !== userId
        );
        // checking in the DB for the data of the reciever
        const user = await userModal.findById(receiverId);

        console.log(user);

        return {
          user: {
            receiverId: user._id,
            email: user.email,
            fullName: user.fullName,
            img: user.image_Id,
          },
          conversationId: conversation._id,
        };
      })
    );

    res.status(201).json(await conversationUserData);
  } catch (error) {
    console.log(`getting error in  this ${error}`);
  }
});

// message route for creating a new message
app.post("/api/message", async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = "" } = req.body;

    if (!senderId || !message) {
      return res.status(100).json({
        status: "403",
        message: "Please fill all the required fields (senderId, message)",
      });
    }

    // lets also store the sender and receiver  name
    const senderName = await userModal.findOne({ _id: senderId });
    const receiverName = await userModal.findOne({ _id: receiverId });
    // console.log(senderName)

    const img = receiverName.image_Id;

    

    if (!conversationId && receiverId) {
      
      const newConversation = conversationModal({
        members: [
          senderId,
          receiverId,
          { senderName: senderName.fullName },
          { receiverName: receiverName.fullName },
          {img:receiverName.image_Id},
        ],
      });

      await newConversation.save(); // await the saving of the new conversation

      const newMessage = messageModal({
        conversationId: newConversation._id,
        senderId,
        message,
      });

      await newMessage.save(); // await the saving of the new message

      return res.status(200).json({
        status: "completed",
        message: "New Conversation and Message are created",
        data: {
          conversationId: newConversation._id,
          messageId: newMessage._id,
        },
      });
    } else if (conversationId) {
    
      // If conversationId is provided, save the message to the existing conversation
      const newMessage = messageModal({
        conversationId,
        senderId,
        message,
        receiverId,
        img
      });

      await newMessage.save(); // await the saving of the new message

      return res.status(200).json({
        status: "completed",
        message: "Message is sent successfully",
        data: {
          conversationId: conversationId,
          messageId: newMessage._id,
          senderUserName: senderName.fullName,
          receiverUserName: receiverName.fullName,
          img: receiverName.image_Id
        },
      });
    } else {
      console.log("hello from the block 3");
      return res.status(100).json({
        status: "incomplete",
        message: "Conversation ID or Receiver ID is required",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Error in sending the message",
    });
  }
});

// route to get info about the message
app.get("/api/message/:conversationId", async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    if (!conversationId)
      return res.status(100).json({
        status: "bad",
        message: "conversation id is required",
      });

    const message = await messageModal.find({ conversationId });

    // const messageUserData = Promise.all(
    //   message.map(async (message) => {
    //     const user = await userModal.findById(message.senderId);
    //     return {
    //       user: { id: user._id, email: user.email, fullName: user.fullName },
    //       message: message.message,
    //       senderUserName: message.senderUserName,
    //       receiverUserName: message.receiverUserName,
    //     };
    //   })
    // );
    
    
    res.status(200).json({
      status: "good",
      message:
        "these are the message which are recieved by the  user from other users ",
      data: message,
    });
    // res.status(400).json(await messageUserData );
  } catch (error) {
    console.log(`getting error in fetching the message data of the user`);
  }
});

// route to get the info of all the user
app.get("/api/users", async (req, res) => {
  const user = await userModal.find();
  // if we want only specific data of the user
  console.log(user)
  const userData = Promise.all(
    user.map((userInfo) => {
      return {
        userInfo: {
          email: userInfo.email,
          fullName: userInfo.fullName,
          userId: userInfo._id,
          img:userInfo.image_Id
        },
      };
    })
  );

  res.json(await userData);
});

// starting the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

