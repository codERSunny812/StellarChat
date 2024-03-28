import { IoSearch } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
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

const MobileView = () => {
  
  const [isSearchBarVisible , setIsSearchBarVisible] = useState(false);
  const [searchWord , setSearchWord] = useState("");
  const [showState , setShowState] = useState(Conversation);
  console.log(showState);




  const handleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
    // Clear search term when hiding the search bar
    if (!isSearchBarVisible) setSearchWord("");
  };


  const handleState = (state)=>{

    console.log('im clicked');
    console.log(state);

    setShowState(state);

  }
 

  return (
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
              className="outline-none px-4 py-1  placeholder:px-2 placeholder:capitalize text-black text-lg capitalize rounded-full"
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
        <MdOutlineAccountCircle className='h-11 w-11' />

      </div>

      {/* mid section */}
      <div className="midSection text-white mx-[21px] my-[25px] flex justify-evenly">
        {
        Array(5).fill(null).map((messages, index) => (
          <div key={index}>
            <MdOutlineAccountCircle className="w-12 h-12" />
      
          </div>
        ))}
      </div>

      {/* chats section */}
      <div className="chatSection  bg-white rounded-t-3xl h-screen">
        
        <div className="chats my-1 py-3 h-[650px] overflow-scroll">

          {/* { messages.map((message, index) => (
            <div key={index} className='mx-2 my-6'>
              <div className="personChat flex items-center px-4 gap-5">
                <img src={message.img} className='h-16 w-16' alt="Profile" />
                <div className="">
                  <h1 className='capitalize text-xl'>{message.name}</h1>
                  <p className='text-gray-500'>hello </p>

                </div>
               
              </div>
            </div>
          ))} */}
          {
            showState == Conversation && <Conversation/>
          }

          {
            showState == CallSection && <CallSection />
          }

          {
            showState == ContactSection && <ContactSection />

          }

          {
            showState == Setting && <Setting/>
          }

        </div>

      </div>

      {/* end section */}

      <div className="endSection  bg-white w-full h-[80px] flex items-center justify-around capitalize fixed bottom-0 shadow-3xl font-semibold">

        <div className="messageIcon flex flex-col items-center cursor-pointer" onClick={()=>handleState(Conversation)}>
          <AiOutlineMessage className='h-6 w-6' />
          <h1>message</h1>
        </div>

        <div className="callIcon flex flex-col items-center cursor-pointer" onClick={() => handleState(CallSection)}>
          <PiPhoneCall className='h-6 w-6' />
          <h1>call</h1>
        </div>

        <div className="contactIcon flex flex-col items-center cursor-pointer" onClick={() => handleState(ContactSection)}>
          <RiContactsLine className='h-6 w-6' />
          <h1>contacts</h1>
        </div>

        <div className="settingIcon flex flex-col items-center cursor-pointer" onClick={() =>  handleState(Setting)}>
          <IoSettingsOutline className='h-6 w-6' />
          <h1>setting</h1>
        </div>
      </div>


    </div>
  );
}

export default MobileView;
