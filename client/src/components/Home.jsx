/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import MobileView from "./Mobile View/MobileView";
import ConversationList from "./ConversationList";
import MessageViewList from "./MessageViewList";
import People from "./People";
import {io} from 'socket.io-client'

const DashBoard = () => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-details"))
  );
  const [isMobileView, setIsMobileView] = useState(false);
  const [messages, setMessages] = useState({});
  const [conversation, setConversation] = useState([]);
  const [sentMessage, setSentMessage] = useState("");
  const [showAllUser, setShowAllUser] = useState([]);

  // connecting the front end with the  socket server
  const socket = useMemo(() => io('http://localhost:3000'),[]);

  
  useEffect(()=>{ 
  socket.on('connect',()=>{

    console.log(`socket is connected ${socket.id}`);

    // event to send the id of loggedIn user
    socket?.emit("addUser",user?.id);
      
    // listing to the event
    socket.on("getUser",(data)=>{
      console.log(`active users are >>> ` , data);
    })

    socket.on('getMessage',(data)=>{
      console.log(data);
      setMessages(prev => ({
        ...prev,
        messages: [...prev.messages, { user: data.user, message: data.message }]
      }))
      // setMessages(data.message);
      console.log(messages);

  });

})
},[socket]); 


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

  const fetchMessages = async (conversationId, fullName, receiverId) => {
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
      setMessages({
        data: resData,
        name: fullName, //name of the receiver
        conversationId,
        receiverId,
      });
    }
    catch (error) {
    console.log("error in fetching the message route");
    }
  };

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
 

  const createConversation = async ({ senderId, receiverId }) => {
    try {
      // Check if conversation already exists
      const existingConversation = conversation.find(
        (conv) => conv.user.receiverId === receiverId
      );

      console.log(existingConversation);

      if (existingConversation) {
        alert("conversation is already created");
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


  console.log("the value of the  message : ",sentMessage);
  console.log("the value of the message in the convo is: ", messages)
  console.log("the value of the conversation is:",conversation);
  console.log("the value of the all the user is:",showAllUser);
  

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
