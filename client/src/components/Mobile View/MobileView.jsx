import React from 'react'
import { IoSearch } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

const MobileView = () => {
  return (
    <>
    <div className="mobileView border-2 border-black bg-[#1E1E1E]">
    
   {/* top section */}
   <div className="topsection border-2 border-blue-400 flex justify-between items-center text-white mx-[24px] my-[20px]">
    {/* search bar */}
    <IoSearch className='h-7 w-7' />

    {/* mid text */}
    <h2 className='capitalize font-medium text-xl'>home</h2>

    {/* end text */}
    <MdOutlineAccountCircle className='h-9 w-9'/>
   </div>

   {/* mid section  */}
   <div className="midSection border-2 border-white text-white mx-[21px] my-[45px] flex justify-evenly">
          {Array(5).fill(null).map((index) => (
            <div key={index}>
              <MdOutlineAccountCircle className="w-10 h-10" />
              </div>
          ))}
    
    </div>

   {/* chats section */}
   <div className="chatSection border-2  border-green-400 bg-white rounded-t-full">
    here comes the message section
   </div>

    </div>
    </>
  )
}

export default MobileView