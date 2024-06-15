const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { connectDatabase } = require("./Database/data_connection");
const dotenv = require("dotenv");
const {userModal} = require('./models/user.modal')

//imported the various  routes
const authRoutes = require("./Routes/authRoute");
const userRoutes = require("./Routes/userRoute");
const conversationRoutes = require("./Routes/conversationRoute");
const messageRoutes = require("./Routes/messageRoute");
const homeRoute = require("./Routes/homeRoute");
const groupRoute = require('./Routes/groupCreateRoute');
const statusRoute = require('./Routes/statusRoute')
const runCronJobs = require("./utility/cronJobs");

// to handle the environmental variable
dotenv.config();

//prevent the shutting of the render server
runCronJobs();

// Connecting to the database
connectDatabase();

//server instance
const app = express();
const server = createServer(app);

//port allocation
const port = process.env.PORT || 4001;

//static files -> static files will be served from this
app.use(express.static("./Public"));


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);


//routes to handle the  functionalities of app
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", conversationRoutes);
app.use("/api", messageRoutes);
app.use("/api", homeRoute);
app.use('/api',groupRoute);
app.use('/api',statusRoute)

// initilize the socket server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN_URL,
    methods: ["GET", "POST"],
    credentials:true,
  },
});

// Socket connection

// array to add the people who joined the socket

let allConnectedUser = [];

io.on("connection", (socket) => {

  socket.on("addUser", ({ id, name }) => {
    if (!allConnectedUser.some((user) => user.userId === id)) {
      const user = {
        userId: id,
        userName: name,
        socketId: socket.id,
        message: "The logged in user is added in the array",
      };

      //adding the user in array 

      allConnectedUser.push(user);


      // notify the all the users
      io.emit("getUser", allConnectedUser);
    }
  });

  socket.on(
    "send-message",
    async ({ conversationId, senderId, message, receiverId }) => {
      // checking for the receiver in the array 
      const receiver = allConnectedUser.find(
        (user) => user.userId === receiverId
      );

      // checking for the sender in the array 

      const sender = allConnectedUser.find((user) => user.userId === senderId);

      const user = await userModal.findById(senderId);

      if (receiver) {
        io.to(receiver.socketId)
          .to(sender.socketId)
          .emit("getMessage", {
            senderId,
            conversationId,
            message,
            receiverId,
            user: {
              id: user._id,
              fullName: user.fullName,
              email: user.email,
            },
          });
      }
    }
  );

  socket.on("disconnect", () => {
    allConnectedUser = allConnectedUser.filter(
      (user) => user.socketId !== socket.id
    );
    io.emit("getUser", allConnectedUser);
  });

});

// home route

app.get("/", (req, res) => {
  res.send("hello from the home route");
});

// server host
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
