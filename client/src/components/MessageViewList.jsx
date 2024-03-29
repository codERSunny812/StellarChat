/* eslint-disable react/prop-types */
import {  IoVideocam, IoSend } from "react-icons/io5";
import { MdAddIcCall } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { avtar } from "../../constant";

const MessageViewList = ({ messages, user, sentMessage, sendMessage, updateSentMessage }) => {

    const handleSentMessageChange = (e) => {
        updateSentMessage(e.target.value);
    };
  return (
    <>

          <div className=" col-span-6  h-screen">
              {messages.name && (
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
              )}

              {/* chats section */}

              <div className=" h-[80%] overflow-scroll w-full">
                  <div className=" mx-3 my-2">
                      {messages.name ? (
                          messages?.data?.data?.map(
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
                          )
                      ) : (
                          <div className="text capitalize flex items-center justify-center my-80 text-2xl font-bold">
                              <h1>no conversation found</h1>
                          </div>
                      )}
                  </div>
              </div>
              <hr />

              {/* input box for sending the  messages  */}

              {messages.name && (
                  <div className="my-2 mx-2  py-3 mb-1 bg-[#392467] flex items-center justify-center rounded-lg">
                      <BsFillEmojiSmileFill color="white" />

                      <input
                          type="text"
                          name="message"
                          className="border-none py-2 w-3/4 outline-none bg-transparent placeholder:capitalize placeholder:px-2 bg-white rounded-lg mx-4"
                          placeholder="type your message.... "
                          value={sentMessage}
                          onChange={handleSentMessageChange}
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
              )}
          </div>

    </>
  )
}

export default MessageViewList