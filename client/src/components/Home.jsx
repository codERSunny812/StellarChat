/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import MobileView from "./Mobile View/MobileView";
import ConversationList from "./ConversationList";
import MessageViewList from "./MessageViewList";
import People from "./People";
import {io} from 'socket.io-client'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashBoard = () => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-details"))
  );
  const [isMobileView, setIsMobileView] = useState(false);
  const [messages, setMessages] = useState({
    data:[], // Initialize with an empty array or an appropriate initial value
    name: '', // Initialize with an empty string or an appropriate initial value
    conversationId: '',
    receiverId: '',
  });
  const [conversation, setConversation] = useState([]);
  const [sentMessage, setSentMessage] = useState("");
  const [showAllUser, setShowAllUser] = useState([]);
  const [isOnline , setIsOnline] = useState(true);

  // connecting the front end with the  socket server
  const socket = useMemo(() => io('http://localhost:3000'),[]);

  



  // to handle the online and offline status  of the  user
  useEffect(()=>{
   window.addEventListener("online",()=> setIsOnline(true));

   window.addEventListener('offline',()=> setIsOnline(false));
  },[])

  // to handle the socket connection and event
  useEffect(() => {
    // Set up socket event listeners
    socket.on('connect', () => {
      console.log(`User is connected with socketId: ${socket.id}`);

      // Event to send the id of the loggedIn user
      const userData = {
        id: user?.id,
        name: user?.fullName,
      }
      socket?.emit("addUser", userData);

      // Listen for incoming messages
      socket.on("getMessage", handleMessage);

      // List active users
      socket.on("getUser", (data) => {
        console.log(`Active users are -> `, data);
      });
    });

    // Clean up event listeners on component unmount
    return () => {
      socket.off("getMessage", handleMessage);
      socket.off("connect");
      socket.off("getUser");
    };
  }, [socket, user]);


  // Function to handle incoming messages
  const handleMessage = (data) => {
    console.log("Inside the getMessage event");
    console.log(data);

    // Extract message data from the received object
    const { senderId, conversationId, message, receiverId } = data;

    // Update the messages state with the received message
    setMessages(prevMessages => ({
      ...prevMessages,
      data: [
        ...prevMessages.data,
        {
          senderId,
          conversationId,
          message,
          receiverId
        }
      ]
    }));
  };

  // handle responsiveness
  useEffect(() => {
    
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    // Call handleResize on initial mount
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // fetch conversations of  the loggedIn user
  const fetchConversation = async () => {
    const res = await fetch(
      `http://localhost:3000/api/conversation/${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    setConversation(resData);

  };

  // update the conversationList on component mount
  useEffect(() => {
   try {
     fetchConversation();
   }
   catch (error) {
    console.log(error)
   }
  },[]);

  // fetch all the users
  useEffect(() => {
 try {
   const fetchAllUser = async () => {
     const res = await fetch("http://localhost:3000/api/users", {
       method: "GET",
       headers: {
         "Content-type": "application/json",
       },
     });

     const resData = await res.json();
     setShowAllUser(resData);
   };
   fetchAllUser();
 }
 catch (error) {
  console.log(error)
 }
  }, []);


  // function to fech message of any user
  const fetchMessages = async (conversationId, fullName, receiverId , img) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/message/${conversationId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const resData = await res.json();
      // console.log(resData.data);
      // Append new messages to the existing ones in the state and take care of the previous state too.
      setMessages(prevMessages => {
        return{
          ...prevMessages,
          data: [...prevMessages.data, ...resData.data],
          name: fullName,
          conversationId,
          receiverId,
          img
        }
        
      });
    }
    catch (error) {
    console.log("error in fetching the message route");
    }
  };


  // function to send messages
  const sendMessage = async () => {

    try {
      // sending a message event 
      socket.emit("send-message",{
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message: sentMessage, // Corrected field name to 'message'
        receiverId: messages?.receiverId, 
      })

      const response = await fetch("http://localhost:3000/api/message", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          conversationId: messages?.conversationId,
          senderId: user?.id,
          message: sentMessage,
          receiverId: messages?.receiverId,
        }),
      });

      if (response.ok) {
        console.log("Message sent successfully");
        setSentMessage("");
      } 
      else {
        console.error("Failed to send message");
      }
    } 
    catch (error) {
    console.log("Error in sending the message:", error);
    }
  };
 


  // function to create conversation  between people
  const createConversation = async ({ senderId, receiverId }) => {
    try {
      // Check if conversation already exists
      const existingConversation = conversation.find(
        (conv) => conv.user.receiverId === receiverId
      );

      console.log(existingConversation);

      if (existingConversation) {
        toast.warning("conversation already exist",{
          position:"top-center",
          theme:"dark"
        })
        return; 
      }

      const response = await fetch("http://localhost:3000/api/conversation", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ senderId, receiverId }),
      });

      if (response.ok) {
        console.log("Conversation created successfully");
        // Fetch the newly created conversation
        await fetchConversation();
        toast.info("a new conversation is created",{
          position:"top-center",
          theme:"colored"

        })
      }
      else {
        console.error("Failed to create conversation");
      }
    }
    catch (error) {
      console.log("error in creating the conversation");
    }
  };

  const updateSentMessage = (newSentMessage) => {
    setSentMessage(newSentMessage);
  };

  const updateSentMessageForMobile = (newSentMessageFromMobile)=>{
    setSentMessage(newSentMessageFromMobile);
  };


  // console.log("the value of the typed message is : ",sentMessage);
  console.log("the value of the message in the convo between users is: ", messages)
  // console.log("the value of the conversation is:",conversation);
  // console.log("the value of the all the user is:",showAllUser);
  

  return (
    <div className="">
      {isMobileView ? (
  
        <MobileView 
        conversations={conversation} 
        showAllUser={showAllUser} 
        user={user} 
        sendMessage={sendMessage} 
        fetchMessages={fetchMessages} 
        messages={messages}
        sentMessage={sentMessage}
       updateSentMessageForMobile={updateSentMessageForMobile}  
       isOnline={isOnline}
        />
      ) : (
    
        <div className="h-screen grid grid-cols-12 overflow-hidden">

          <ConversationList 
          conversations={conversation} 
          fetchMessages={fetchMessages} 
          user={user}
          />
         

         
          <MessageViewList 
          messages={messages} 
          user={user} 
          sentMessage={sentMessage} 
          sendMessage={sendMessage}
          updateSentMessage={updateSentMessage}
          isOnline={isOnline}
          />

          <People 
          showAllUser={showAllUser} 
          user={user} 
          createConversation={createConversation} 
          />
            
        </div>
      )}
    </div>
  );
};

export default DashBoard;
