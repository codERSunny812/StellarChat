/* eslint-disable no-unused-vars */
import { avtar } from "../../constant";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoSearchCircle, IoVideocam, IoSend } from "react-icons/io5";
import { MdAddIcCall } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useEffect, useState } from "react";
import MobileView from "./Mobile View/MobileView";
import NoMessage from "../anim/NoMessage.json";
import Lottie from "lottie-react";

const DashBoard = () => {

  const [searchWord, setSearchWord] = useState("");
  const [isLogoutDropDown, setLogOutDropDown] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-details"))
  );
  const [isMobileView, setIsMobileView] = useState(false);
  const [messages, setMessages] = useState({});
  const [conversation, setConversation] = useState([]);
  const [sentMessage, setSentMessage] = useState("");

  // console.log("in the home route");

  // getting the local storage data here
  // console.log(JSON.stringify(user));

  // console.log( conversation);
  // console.log(typeof messages);

  

  useEffect(() => {
    const handleResize = () => {
      // Set isMobileView to true if window width is less than or equal to 768px
      setIsMobileView(window.innerWidth <= 768);
    };

    // Call handleResize on initial mount
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // fetch for the user for  the conversation
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
      // console.log(typeof resData)
      setConversation(resData);
      // console.log(typeof conversation)
      // console.log("respose data for  the  conversation api is : ");
      // console.log(resData);
    };

    //calling the function
    fetchConversation();

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("the value of the conversation is:");
  console.log(conversation);

  console.log("the value of the messages is :");
  console.log(messages);

  console.log("the sent message is:");
  console.log(sentMessage);

  // console.log(typeof  conversation)

  // search function for the user
  const searchUser = () => {};

  // console.log("the user's who are involved  in the conversation are:");
  // console.log(conversation);

  // function  to fetch the message of a user from server and display it in chat box
  const fetchMessages = async (conversationId, fullName) => {
    try {
      console.log("hello im fetch message function is running");
      // console.log(fullName)
      // console.log(conversationId);
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
      //  console.log(resData);
      setMessages({ data: resData, name: fullName , conversationId });
    } catch (error) {
      console.log("error in fetching the message route");
    }
  };

  // console.log(messages.name)

  // function  to send message

  const sendMessage = async () => {
    try {
      
      console.log("inside the message sending function");
      const msg = fetch('http://localhost:3000/api/message',{
        method:'POST',
        headers:{
            "Content-type": "application/json",
        },
        body:JSON.stringify({
          "conversationId":"",
          "senderId":"",
          sentMessage,
          "receiverId":""

        })
      })
    } catch (error) {
      console.log('error in sending the message');
    }  
  };

  return (
    <div className="">
      {isMobileView ? (
        // mobile view
        <MobileView searchUser={searchUser} />
      ) : (
        // laptop view
        <div className="h-screen grid grid-cols-12 overflow-hidden">
          {/* left  part of the  home*/}

          <div className="h-screen  md:block col-span-3 overflow-auto bg-[#5D3587]">
            {/* top part */}

            <div className="flex  items-center justify-between">
              <div className="flex items-center px-4 py-4">
                <div className="image border-2 border-black rounded-full">
                  <img
                    src="https://xsgames.co/randomusers/assets/avatars/male/63.jpg"
                    alt="user image"
                    height={60}
                    width={60}
                    className="rounded-full"
                  />
                </div>

                <div className="accountInfo ml-6 text-white">
                  <h1 className="text-xl capitalize">{user.fullName}</h1>
                  <h2 className="text-lg font-light">my account</h2>
                </div>
              </div>

              <div className="end_icons">
                <PiDotsThreeCircleFill
                  className="h-9 w-9 cursor-pointer"
                  onClick={() => setLogOutDropDown(!isLogoutDropDown)}
                  color="white"
                />
                {isLogoutDropDown && (
                  <div className=" h-10 w-25 absolute left-[245px] bg-[#A367B1] top-[60px] capitalize text-white flex items-center justify-center rounded-lg px-3">
                    <h1>log out</h1>
                    <CiLogout />
                  </div>
                )}
              </div>
            </div>

            <hr />

            {/* messages section  of the user  */}
            <div className="messages ">
              {/* search panel to search people */}
              <div className="searchBar  flex items-center">
                <input
                  type="search"
                  placeholder="search people"
                  className="border-2 border-black mx-2 my-2 w-3/4 border-none bg-transparent  px-4 py-2 outline-blue-500 placeholder:px-1 placeholder:capitalize"
                  value={searchWord}
                  onChange={(e) => {
                    e.preventDefault();
                    setSearchWord(e.target.value);
                    searchUser();
                    // console.log(searchWord);
                  }}
                />
                <IoSearchCircle className="h-10 w-10 mx-1 my-1" color="white" />
              </div>

              <h1 className="capitalize px-3 mt-2 text-white">messages</h1>
              {conversation.length > 0 ? (
                conversation.map(
                  ({ user: { email, fullName , receiverId } , conversationId }) => {
                    // console.log(conversationId)
                    return (
                      <div
                        className=" cursor-pointer flex  items-center px-4 py-4 border-b "
                        key={conversationId}
                        onClick={() => {
                          fetchMessages(conversationId, fullName);
                        }}
                      >
                        <img
                          src={avtar}
                          height={60}
                          width={60}
                          alt={fullName}
                        />
                        <div className="accountInfo ml-6 text-white">
                          <h1 className="text-lg">{fullName}</h1>
                          <h2 className="text-sm font-light">{email}</h2>
                        </div>
                        <hr />
                      </div>
                    );
                  }
                )
              ) : (
                <div className="border-2 border-white flex items-center justify-center mt-6">
                  <Lottie animationData={NoMessage} />
                </div>
              )}
            </div>
          </div>

          {/* mid part  of the  home*/}
          <div className=" col-span-6 border-2 border-sky-500 h-screen">
            <div className="flex items-center justify-between bg-[#392467] shadow-3xl rounded-lg py-1 mt-2 mx-1 relative top-0">
              <div className="px-4 flex items-center ">
                <img
                  src={avtar}
                  alt="user image"
                  height={50}
                  width={50}
                  className="py-1"
                />
                <h1 className="px-4  text-white">
                  <h1 className="capitalize font-medium text-lg">
                    {messages.name || <h1> xyz</h1>}
                  </h1>
                  <span>status</span>
                </h1>
              </div>
              <div className="icons flex mx-3">
                <MdAddIcCall
                  className="mr-2 h-6 w-6 cursor-pointer"
                  color="white"
                />
                <IoVideocam
                  className="mr-2 h-6 w-6 cursor-pointer"
                  color="white"
                />
              </div>
            </div>

            {/* chats section */}

            <div className=" h-[80%] overflow-scroll w-full border-2 border-green-500">
              <div className=" mx-3 my-2">
                {messages?.data?.data?.map(

                  ({ conversationId, message, senderId, _id }) => {
                    //  console.log(message);
                    return (
                      <div className="mx-3 my-2 " key={_id}>
                        {senderId == user.id ? (
                          <div className=" max-w-[40%] rounded-4xl  bg-[#A367B1] text-white px-2 py-2  ml-auto font-edu-nsw">
                            {message}
                          </div>
                        ) : (
                          <div className=" max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-2  font-edu-nsw">
                            {message}
                          </div>
                        )}
                      </div>
                      

                    );
                  }
                )}
              </div>
            </div>
            <hr />

            {/* input box for sending the  messages  */}
            <div className="my-2 mx-2  py-3 mb-1 bg-[#392467] flex items-center justify-center rounded-lg">
              <BsFillEmojiSmileFill color="white" />

              <input
                type="text"
                name="message"
                className="border-none py-2 w-3/4 outline-none bg-transparent placeholder:capitalize placeholder:px-2 bg-white rounded-lg mx-4"
                placeholder="type your message.... "
                value={sentMessage}
                onChange={(e) => setSentMessage(e.target.value)}
              />
              <IoSend
                className="h-5 w-5 mx-2 cursor-pointer"
                color="white"
                onClick={() => {
                  sendMessage();
                }}
              />
              <FaPlusCircle
                className="h-5 w-5 mx-2 cursor-pointer"
                color="white"
              />
            </div>
          </div>

          {/* right part of the  home */}
          <div className="col-span-3 flex items-center justify-center bg-[#5D3587] text-white">
            conversation section is here
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
