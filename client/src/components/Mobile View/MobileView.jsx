/* eslint-disable react/prop-types */
import { IoSearch } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { PiPhoneCall } from "react-icons/pi";
import { RiContactsLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import { WiDirectionLeft } from "react-icons/wi";
import ChatSection from "./ChatSection.";
import CallSection from "./CallSection";
import ContactSection  from './ContactSection';
import Conversation from './ConversationSection';
import Setting from  './SettingSection';
import { FcPlus } from "react-icons/fc";




const CONVERSATION = 'CONVERSATION';
const CALL_SECTION = 'CALL_SECTION';
const CONTACT_SECTION = 'CONTACT_SECTION';
const SETTING_SECTION = 'SETTING_SECTION';

const MobileView = ({ conversations, showAllUser, user, sendMessage, fetchMessages, messages, sentMessage, updateSentMessageForMobile, createConversation }) => {


  
  const [isSearchBarVisible , setIsSearchBarVisible] = useState(false);
  const [searchWord , setSearchWord] = useState("");
  const [showState , setShowState] = useState(CONVERSATION);
  const [isChatVisible , setIsChatVisible] = useState(false);
  const [story,setStory] = useState(null);

 




  const handleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
    // Clear search term when hiding the search bar
    if (!isSearchBarVisible) setSearchWord("");
  };

  const handleState = (state) => {
    setShowState(state);
  }

  const  handleConversationClick = (conversationId , fullName , receiverId , img) =>{
    console.log("im clicked");
    fetchMessages(conversationId, fullName, receiverId , img);
    setIsChatVisible(conversationId);

  }

  const handleArrowInChat = ()=>{
 setIsChatVisible(false);
  }



  const handleStory = (e)=>{
    const file = e.target.files[0];
    setStory(file);
  }


  console.log("the value of the story is:")
  console.log(story)
  
  return isChatVisible ? (
  <ChatSection 
  messages={messages} 
  handleArrowInChat={handleArrowInChat} 
  user={user} 
  sendMessage={sendMessage}
    sentMessage={sentMessage}
    updateSentMessageForMobile={updateSentMessageForMobile}
    /> ) :  (
    <div className="mobileView h-screen overflow-hidden bg-[#1E1E1E] sticky top-0 left-0">
    

      {/* top section */}
      <div className="topsection flex justify-between items-center text-white mx-[24px] my-[10px]">

        {/* search bar */}
        {
          isSearchBarVisible ?(
            <div className="flex items-center bg-white my-1 py-[5px] rounded-full">
              <WiDirectionLeft className="text-black h-7 w-7 " onClick={handleSearchBar} />
              <input type="search" 
              placeholder="search...." 
              className="outline-none px-4 py-[2px]  placeholder:px-2 placeholder:capitalize text-black text-lg capitalize rounded-full"
              value={searchWord}
                onChange={(e) => {
                  const searchTerm = e.target.value;
                  setSearchWord(searchTerm);
                
                }}

              /> 
            </div>
          ) : <IoSearch className='h-10 w-10 border-2 border-white rounded-full p-1' onClick={handleSearchBar} />
        }
        

        {/* mid text */}
        {
          !isSearchBarVisible && <h2 className='capitalize font-medium text-xl'>home</h2>
        }
        

        {/* end text */}
        {/* <MdOutlineAccountCircle className='h-11 w-11' /> */}
        <img src={user.imageId} alt="user image"  className="h-11 w-11 rounded-full"/>

      </div>

      {/* mid section */}
      <div className="midSectionn border-2 border-white text-white mx-[21px] my-[25px]">
        <div className="">
          <form >
          <label htmlFor="file-input">
              <img src={user.imageId} alt="" className="h-14 rounded-full" />
              <FcPlus className="relative bottom-5 left-10" />
              <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleStory} />

          </label>

            </form>
           
        </div>
        
      </div>

      {/* chats section */}
      <div className="chatSection  bg-white rounded-6xl h-screen">
        
        <div className="chats my-1 py-3 h-[650px] overflow-scroll">

          
          {
            showState === CONVERSATION && (
              
                <Conversation conversations={conversations}
                  handleConversationClick={handleConversationClick} />
            
             
                
          
            ) 
          }

          {
            showState === CALL_SECTION && <CallSection showAllUser={showAllUser} user={user}/>
          }

          {
              showState === CONTACT_SECTION && <ContactSection showAllUser={showAllUser} user={user} createConversation={createConversation} />
          }

          {
            showState === SETTING_SECTION && <Setting user={user} />
          }


        </div>

      </div>

      {/* end section */}

      <div className="endSection  bg-white w-full h-[80px] flex items-center justify-around capitalize fixed bottom-0 shadow-3xl font-semibold">

        <div className={`messageIcon flex flex-col items-center cursor-pointer ${
          showState == 'CONVERSATION' ? 'text-blue-700' : 'text-black'
        }`} onClick={()=>handleState(CONVERSATION)}>
          <AiOutlineMessage className='h-6 w-6 ' />
          <h1>message</h1>
        </div>

        <div className={`callIcon flex flex-col items-center cursor-pointer ${
          showState == 'CALL_SECTION' ? 'text-blue-700' : 'text-black'
        }`} onClick={() => handleState(CALL_SECTION)}>
          <PiPhoneCall className='h-6 w-6 ' />
          <h1>call</h1>
        </div>

        <div className={`contactIcon flex flex-col items-center cursor-pointer ${
          showState == 'CONTACT_SECTION' ? 'text-blue-700' : 'text-black'
        } `} onClick={() => handleState(CONTACT_SECTION)}>
          <RiContactsLine className='h-6 w-6' />
          <h1>contacts</h1>
        </div>

        <div className={`settingIcon flex flex-col items-center cursor-pointer ${
          showState == 'SETTING_SECTION' ? 'text-blue-700' : 'text-black'
        }`} onClick={() =>  handleState(SETTING_SECTION)}>
          <IoSettingsOutline className='h-6 w-6' />
          <h1>setting</h1>
        </div>
      </div>



    </div>
  );
}

export default MobileView;
