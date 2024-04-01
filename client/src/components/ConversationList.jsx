/* eslint-disable react/prop-types */
import { avtar } from "../../constant";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoSearchCircle } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import NoMessage from "../anim/NoMessage";
import Lottie from "lottie-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConversationList = ({conversations, fetchMessages , user} ) => {
    
    console.log(conversations)

    const [isLogoutDropDown, setLogOutDropDown] = useState(false);
    const logoutNavigate = useNavigate();

    const logOutHandler = () => {
        localStorage.removeItem("user-details");
        localStorage.removeItem("user-token");
        logoutNavigate("/");
    };

  return (
    <>
          <div className="h-screen  md:block col-span-3 overflow-auto bg-[#5D3587]">
              {/* top part */}

              <div className="flex  items-center justify-between">
                  <div className="flex items-center px-4 py-4">
                      <div className="image border-2 border-black rounded-full">
                          <img
                              src={avtar}
                              alt="user image"
                              height={60}
                              width={60}
                              className="rounded-full"
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

              {/* messages section  of the user  */}
              <div className="messages ">
                  {/* search panel to search people */}
                  <div className="searchBar  flex items-center">
                      <input
                          type="search"
                          placeholder="search people"
                          className="border-2 border-black mx-2 my-2 w-3/4 border-none bg-transparent  px-4 py-2 outline-blue-500 placeholder:px-1 placeholder:capitalize"
                        
                      />
                      <IoSearchCircle className="h-10 w-10 mx-1 my-1" color="white" />
                  </div>

                  <h1 className="capitalize px-3 mt-2 text-white">messages</h1>
                  {conversations.length > 0 ? (
                      conversations.map(
                          ({
                              user: { email, fullName, receiverId },
                              conversationId,
                          }) => {
                              return (
                                  <div
                                      className=" cursor-pointer flex  items-center px-4 py-4 border-b "
                                      key={Math.random()}
                                      onClick={() => {
                                          fetchMessages(conversationId, fullName, receiverId);
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
    </>
  )
}

export default ConversationList