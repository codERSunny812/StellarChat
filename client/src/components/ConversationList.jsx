/* eslint-disable react/prop-types */
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoSearchCircle } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import NoMessage from "../anim/NoMessage";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserStatusContext } from "../Context/Auth";
import Group from "./Group";

const ConversationList = ({ conversations, fetchMessages, user, showAllUser }) => {
  const [isLogoutDropDown, setLogOutDropDown] = useState(false);
  const [activeTab , setActiveTab] = useState('messages');
  const logoutNavigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);

  // console.log(isLoggedIn);

  // function to logout the user
  const logOutHandler = () => {
    localStorage.removeItem("user-details");
    localStorage.removeItem("user-token");
    logoutNavigate("/");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="h-screen  md:block col-span-3 overflow-auto bg-[#5D3587]">
        {/* top part */}
        <div className="flex  items-center justify-between">
          <div className="flex items-center px-4 py-4">
            <div className="image rounded-full">
              <img
                src={user.imageId}
                alt="user image"
                className="h-20 w-20 rounded-full"
              />
            </div>

            <div className="accountInfo ml-6 text-white">
              <h1 className="text-xl capitalize">{user.fullName}</h1>
              <h2 className="text-lg font-light">सर्वेषाम् स्वस्तिर्भवतु🫰</h2>
            </div>
          </div>

          <div className="end_icons">
            <PiDotsThreeCircleFill
              className="h-9 w-9 cursor-pointer"
              onClick={() => setLogOutDropDown(!isLogoutDropDown)}
              color="white"
            />
            {isLogoutDropDown && (
              <div
                className=" h-10 w-25 absolute left-[245px] bg-[#A367B1] top-[60px] capitalize text-white flex items-center justify-center rounded-lg px-3 cursor-pointer "
                onClick={logOutHandler}
              >
                <h1>log out</h1>
                <CiLogout />
              </div>
            )}
          </div>
        </div>

        <hr />

        {/* conversation list of the user */}
        <div className="message">
          {/* search panel to search people */}
          <div className="searchBar  flex items-center">
            <input
              type="search"
              placeholder="search people"
              className="border-2 border-black mx-2 my-2 w-3/4 border-none bg-transparent  px-4 py-2 outline-blue-500 placeholder:px-1 placeholder:capitalize"
            />
            <IoSearchCircle className="h-10 w-10 mx-1 my-1" color="white" />
          </div>

          {/* message and group section */}

          <div className=" flex cursor-pointer">
            <h1 className={`capitalize px-3 mt-2 text-white ${activeTab === "messages" ? "border-b-2 border-white" : ""}`} onClick={()=> setActiveTab('messages')}>messages</h1>
            <h1 className={`capitalize px-6 mt-2 text-white ${activeTab === "groups" ? "border-b-2 border-white" : ""}`} onClick={()=>  setActiveTab("groups")}>group</h1>
          </div>


          {/* conditional rendering of the active tab */}

          {
            activeTab == 'messages' ? (
              
              conversations.length > 0 ? (
                conversations.map(
                  ({
                    user: { email, fullName, receiverId, img },
                    conversationId,
                  }) => {
                    return (
                      <div
                        className=" cursor-pointer flex  items-center px-4 py-4 border-b "
                        key={conversationId}
                        onClick={() => {
                          fetchMessages(conversationId, fullName, receiverId, img);
                        }}
                      >
                        <img
                          src={img}
                          className="h-[68px] w-[68px]  rounded-full"
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
                <div className="mt-6 mx-2 px-5">
                  <Lottie animationData={NoMessage} />
                  <h1 className="text-center capitalize text-white font-semibold text-lg my-4">
                    no conversation is available
                  </h1>
                </div>
              )

            ) : (
              <Group
                  showAllUser={showAllUser}
                  user={user}
                  fetchMessages={fetchMessages}
              
              />
            )
          }


          {
          
        
        }


        {/* group section */}


        </div>
      </div>
    </>
  );
};

export default ConversationList;
