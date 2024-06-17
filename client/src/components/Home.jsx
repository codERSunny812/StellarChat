import { useEffect, useState, useCallback } from "react";
import MobileView from "./Mobile View/MobileView";
import ConversationList from "./ConversationList";
import MessageViewList from "./MessageViewList";
import People from "./People";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchConversations, fetchAllUsers } from "../Utils/ApiCalls";
import NoUser from "../anim/NoUser.json";
import Lottie from "lottie-react";
import { debounce } from "lodash";

// Custom Hook for managing socket connection

const useSocket = (user, handleMessage) => {
  const [socket, setSocket] = useState(null);
  const [activeUser, setActiveUser] = useState([]);

  useEffect(() => {
    if (!user) return;

    const newSocket = io(import.meta.env.VITE_BACKEND_CHAT_APP_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!socket || !user) return;

    const userData = { id: user.id, name: user.fullName };

    socket.on("connect", () => {
      socket.emit("addUser", userData);
    });

    socket.on("getUser", (data) => {
      setActiveUser(data);
    });

    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("connect");
      socket.off("getUser");
      socket.off("getMessage", handleMessage);
    };
  }, [socket, user, handleMessage]);

  return { socket, activeUser };
};

const DashBoard = () => {
  const [user, setUser] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [sentMessage, setSentMessage] = useState("");
  const [showAllUser, setShowAllUser] = useState([]);
  const [messages, setMessages] = useState({
    data: [],
    name: "",
    conversationId: "",
    receiverId: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user-details"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleMessage = useCallback((data) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      data: [...prevMessages.data, data],
    }));
  }, []);

  const { socket, activeUser } = useSocket(user, handleMessage);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobileView(window.innerWidth <= 768);
    }, 100);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const createConversation = useCallback(
    async ({ senderId, receiverId }) => {
      try {
        if (conversation.some((conv) => conv.user.receiverId === receiverId)) {
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
          const updatedConversations = await fetchConversations(user.id);
          setConversation(updatedConversations);
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
    [conversation, user]
  );

  const fetchMessages = useCallback(
    async (conversationId, fullName, receiverId, img) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/message/${conversationId}`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
          }
        );
        const resData = await res.json();
        setMessages((prevMessages) => ({
          ...prevMessages,
          data: resData.data,
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

  const sendMessage = useCallback(async () => {
    try {
      if (!socket) return;

      socket.emit("send-message", {
        conversationId: messages.conversationId,
        senderId: user.id,
        message: sentMessage,
        receiverId: messages.receiverId,
      });

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/message`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            conversationId: messages.conversationId,
            senderId: user.id,
            message: sentMessage,
            receiverId: messages.receiverId,
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
  }, [messages, sentMessage, user, socket]);

  const updateSentMessage = useCallback((newSentMessage) => {
    setSentMessage(newSentMessage);
  }, []);

  const updateSentMessageForMobile = (newSentMessageFromMobile) => {
    setSentMessage(newSentMessageFromMobile);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center my-60">
        <Lottie animationData={NoUser} className="h-80" />
      </div>
    );
  }

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
            socket={socket}
          />
        </div>
      )}
    </div>
  );
};

export default DashBoard;
