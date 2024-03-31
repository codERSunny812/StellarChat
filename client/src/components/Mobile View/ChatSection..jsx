/* eslint-disable react/prop-types */
import { avtar } from "../../../constant"
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoVideocamOutline, IoCallOutline } from "react-icons/io5";
import { HiOutlinePaperClip } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { IoCameraOutline } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import Lottie from "lottie-react";
import NoChat from '../../anim/NoChat.json'


const ChatSection = ({ messages, handleArrowInChat, user, sendMessage, sentMessage, updateSentMessageForMobile }) => {


  const handleSentMessage = (e)=>{
updateSentMessageForMobile(e.target.value);
  }





  return (
    <>
    <div className="h-screen">
      {/* top section */}
      <div className=" flex items-center justify-between">

        <div className="flex items-center  mx-3 px-1 cursor-pointer">
            <IoIosArrowRoundBack className="h-8 w-8" onClick={()=> handleArrowInChat()} />
            <div className="name flex items-center px-3">
              <img src={avtar} alt="user photo" className="h-12 w-12" />
              <div className="px-3">
                <h1 className="capitalize font-semibold text-base">{messages.name}</h1>
                <p className="py-[-2px]">status</p>
             </div>
            </div>

        </div>
          
        <div className="callIcon flex  px-4 mx-2 cursor-pointer">
          <IoCallOutline className="h-7 w-7 mx-2" />
            <IoVideocamOutline className="h-8 w-7 mx-1" />
        </div>
          


      </div>
      {/* chat section */}

        <div className=" h-[81%] overflow-scroll w-full my-4">

          <div className=" mx-3 my-4">
            {messages.name ? (
              messages.data.data.length > 0 ? (
                messages?.data?.data?.map(
                  ({ conversationId, message, senderId, _id }) => {
                    return (
                      <div className="mx-3 my-2 " key={_id}>
                        {senderId == user.id ? (
                          <div className=" max-w-[50%] rounded-4xl  bg-[#20A090] text-white px-2 py-2  ml-auto font-edu-nsw">
                            {message}
                          </div>
                        ) : (
                          <div className=" max-w-[50%] rounded-5xl bg-gray-300 text-black px-2 py-2  font-edu-nsw">
                            {message}
                          </div>
                        )}
                      </div>
                    );
                  }
                )
              ) : (
                  <div className=" flex flex-col items-center justify-center mt-[50%]">
                    <Lottie animationData={NoChat} />
                    <h1 className="font-semibold uppercase text-4xl">no chat found</h1>
                  </div>
              )
            ) : (
              <div className="text capitalize flex items-center justify-center my-80 text-2xl font-bold">
                <h1>no conversation found</h1>
              </div>
            )}
          </div>

        </div>

        <hr />
        {messages.name && (
          <div className="py-2  flex items-center justify-center rounded-lg mt-3">

            <HiOutlinePaperClip color="black" className="h-5 w-5" />

            <input
              type="text"
              name="message"
              className="border-none py-2 w-2/4 outline-none placeholder:capitalize placeholder:px-2 bg-gray-200 rounded-lg mx-3"
              placeholder="type your message.... "
              value={sentMessage}
              onChange={handleSentMessage}
            />
            <IoSend
              className="h-5 w-5 mx-2 cursor-pointer"
              color="black"
              onClick={sendMessage}
            />
            <IoCameraOutline
              className="h-5 w-5 mx-2 cursor-pointer"
              color="black"
            />
            <MdKeyboardVoice 
              className="h-5 w-5 mx-2 cursor-pointer"
              color="black" 
              />



          </div>
        )}

    </div>
    </>
  )
}

export default ChatSection