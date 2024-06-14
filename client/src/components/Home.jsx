/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState, useCallback } from "react";
import MobileView from "./Mobile View/MobileView";
import ConversationList from "./ConversationList";
import MessageViewList from "./MessageViewList";
import People from "./People";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchConversations, fetchAllUsers } from "../Utils/ApiCalls";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};


const DashBoard = () => {

  
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-details"))
  );

  const [isMobileView, setIsMobileView] = useState(false);

  const [messages, setMessages] = useState({
    data: [], // Initialize with an empty array or an appropriate initial value
    name: "", // Initialize with an empty string or an appropriate initial value
    conversationId: "",
    receiverId: "",
  });

  const [conversation, setConversation] = useState([]); //state to store the chats of the user
  const [sentMessage, setSentMessage] = useState(""); //state for the message that to be send
  const [showAllUser, setShowAllUser] = useState([]); //state to store the data of the user
  const [socket,setSocket]= useState(null);
  const [activeUser,setActiveUser] = useState([]);

  // Connecting the front end with the socket server
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_CHAT_APP_URL);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user]);



  // socket user adding and getting the active user data 
  useEffect(() => {
    if (!socket) return;

    // collecting the data of the loggedIn user 
    const userData = { id: user?.id, name: user?.fullName };

    socket.on("connect", () => {
      socket.emit("addUser", userData);
    });

    // listing to the getuser event 
    socket.on('getUser',(data)=>{
      setActiveUser(data);
    })

   
    return () => {
      socket.off("connect");
      socket.off("getUser");
    };
  }, [socket, user]);

  // to handle responsivness of app
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    const debounceResize = debounce(handleResize, 100);
    window.addEventListener("resize", debounceResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, []);

  // update the conversationList on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const resData = await fetchConversations(user.id);
        setConversation(resData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user]);

  // fetch all the users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resData = await fetchAllUsers();
        setShowAllUser(resData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);


  // socket event for the real time communication 
  useEffect(()=>{
    if(!socket) return;

    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("getMessage", handleMessage);
    };



  },[socket])


  // function to create conversation  between people
  const createConversation = useCallback(
    async ({ senderId, receiverId }) => {
      try {
        if (conversation.find((conv) => conv.user.receiverId === receiverId)) {
          toast.warning("Conversation already exist", {
            position: "top-center",
            theme: "dark",
            autoClose: 1500,
          });
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/conversation`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ senderId, receiverId }),
          }
        );

        if (response.ok) {
          await fetchConversations();
          toast.info("Conversation created", {
            position: "top-center",
            theme: "dark",
            autoClose: 1500,
          });
        } else {
          console.error("Failed to create conversation");
        }
      } catch (error) {
        console.error("Error in creating the conversation:", error);
      }
    },
    [conversation]
  );

  // Function to handle incoming messages for socket
  const handleMessage = useCallback((data) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      data: [...prevMessages.data, data],
    }));
  }, []);

  // function to fetch message of any particular conversation
  const fetchMessages = useCallback(
    async (conversationId, fullName, receiverId, img) => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_CHAT_APP_URL
          }/api/message/${conversationId}`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
          }
        );
        const resData = await res.json();
        setMessages((prevMessages) => ({
          ...prevMessages,
          data: [...prevMessages.data, ...resData.data],
          name: fullName,
          conversationId,
          receiverId,
          img,
        }));
      } catch (error) {
        console.error("Error in fetching messages:", error);
      }
    },
    []
  );

  // function to send messages
  const sendMessage = useCallback(async () => {
    try {
      socket.emit("send-message", {
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message: sentMessage,
        receiverId: messages?.receiverId,
      });

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/message`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            conversationId: messages?.conversationId,
            senderId: user?.id,
            message: sentMessage,
            receiverId: messages?.receiverId,
          }),
        }
      );

      if (response.ok) {
        setSentMessage("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error in sending the message:", error);
    }
  }, [messages, sentMessage, user , socket]);

  const updateSentMessage = useCallback((newSentMessage) => {
    setSentMessage(newSentMessage);
  }, []);

  const updateSentMessageForMobile = (newSentMessageFromMobile) => {
    setSentMessage(newSentMessageFromMobile);
  };

  return (
    <div className="">
      {isMobileView ? (
        // mobile view
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
          createConversation={createConversation}
        />
      ) : (
        <div className="h-screen grid grid-cols-12 overflow-hidden">
          <ConversationList
            conversations={conversation}
            fetchMessages={fetchMessages}
            user={user}
            showAllUser={showAllUser}
          />

          <MessageViewList
            messages={messages}
            user={user}
            sentMessage={sentMessage}
            sendMessage={sendMessage}
            updateSentMessage={updateSentMessage}
            activeUser={activeUser}
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
