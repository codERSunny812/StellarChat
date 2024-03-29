/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
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
  const [socket , setSocket] = useState(null);



  // connect with the socket
  useEffect(()=>{
    setSocket(io('http://localhost:3002/'))
  },[])

  // console.log(socket)

  // event in socket
  useEffect(() => {
    if (socket) {
      socket?.emit("addUser", user.id);
      socket?.on("getUser",(users)=>{
        console.log('active users -->'+ users);
      })
    }
  }, [socket]);




  
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

  useEffect(() => {
   try {
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
      //  console.log(resData);
       setConversation(prevConversation => [...prevConversation, ...resData]);
     };

     fetchConversation();
   } catch (error) {
    console.log(error)
   }
  },[]);

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
 } catch (error) {
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
        name: fullName,
        conversationId,
        receiverId,
      });
    } catch (error) {
      console.log("error in fetching the message route");
    }
  };

  const sendMessage = async () => {
    try {

      const response = await fetch("http://localhost:3000/api/message", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          conversationId: messages?.conversationId,
          senderId: user?.id,
          message: sentMessage, // Corrected field name to 'message'
          receiverId: messages?.receiverId,
        }),
      });
      // clearing the state after sending the message
      setSentMessage("");

      if (response.ok) {
        console.log("Message sent successfully");
        // Optionally, you can handle any logic here after successful message sending
      } else {
        console.error("Failed to send message");
        // Optionally, you can handle error cases here
      }
    } catch (error) {
      console.log("Error in sending the message:", error);
      // Optionally, you can handle error cases here
    }
  };
 
  const createConversation = async ({ senderId, receiverId }) => {
    try {
    
      // Check if conversation already exists
      const existingConversation = conversation.find(
        (conv) => conv.user.receiverId === receiverId
      );

      console.log("the value of existingConversation is:");
      console.log(existingConversation);

      if (existingConversation) {
        console.log("Conversation already exists:", existingConversation);
        alert("conversation is already created");
        return; // Exit the function if conversation already exists
      }

      const response = await fetch("http://localhost:3000/api/conversation", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ senderId, receiverId }),
      });
      const responseData = await response.json();
      console.log("the response of the api of creating a convo is:");
      console.log(responseData);
    
    } catch (error) {
      console.log("error in creating the conversation");
    }
  };

  const updateSentMessage = (newSentMessage) => {
    setSentMessage(newSentMessage);
  };


  return (
    <div className="">
      {isMobileView ? (
  
        <MobileView conversations={conversation} showAllUser={showAllUser} user={user}  />
      ) : (
    
        <div className="h-screen grid grid-cols-12 overflow-hidden">
          {/* left  part of the  home*/}
            <ConversationList conversations={conversation} fetchMessages={fetchMessages} />
         

          {/* mid part  of the  home*/}
            <MessageViewList messages={messages} user={user} sentMessage={sentMessage} sendMessage={sendMessage}
              updateSentMessage={updateSentMessage}
            />

          {/* right part of the  home */}
            <People showAllUser={showAllUser} user={user} createConversation={createConversation} />
            
        </div>
      )}
    </div>
  );
};

export default DashBoard;
