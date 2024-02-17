import { useState } from "react"
import Input from "../components/Input"
import SocialMedia from "../components/SocialMedia";
import { useParams } from "react-router-dom";

const Form = () => {
  // dummy state to check the login page
  const[isLoggedIn,setIsLoggedIn] = useState(true);
  return (
    <div className="h-screen w-full flex justify-center items-center  bg-[#FAF9F6]">
   <div className=" h-screen w-[400px] rounded-xl shadow-lg bg-white">
    <form className=" my-4 flex flex-col">



      {
        isLoggedIn ? (
              <h1 className="capitalize text-center my-6 font-bold text-lg">log in to chatkro</h1> 
        ) : 
        (
                <h1 className="capitalize text-center my-6 font-bold text-lg">sign up with the email</h1>
        )
      }

      {
        isLoggedIn ? (
              <p className="px-9 capitalize text-gray-400 my-5"> welcome back ! sign in using  your social account or email to continue us</p>
        ) :
        (
                <p className="px-9 capitalize text-gray-400 my-5"> get chatting with your family and friends today by signing up for our chat app!</p>
        )
      }

       {
            isLoggedIn && <div className="flex items-center justify-center"><SocialMedia /></div>
       }

       {
            isLoggedIn && <div className=" uppercase text-sm  flex items-center mt-10">
              <hr className='w-44' />
              <span className='px-2'>or</span>
              <hr className='w-44' />
            </div>
       }




     
       {
            !isLoggedIn && <Input label="  your name" type="text"  />
       }

      <Input label="your email" type="email" />

      <Input label="your password" type="password" />

      {
            !isLoggedIn && <Input label="confirm password" type="password"  />
      }

      {
        isLoggedIn ? (
              <button type="submit" className=" my-3 w-3/4 py-2 mx-auto px-3 rounded-2xl bg-[#24786D] text-white capitalize">log in</button>
        ) :
        (
                <button type="submit" className=" my-3 w-3/4 py-2 mx-auto px-3 rounded-2xl bg-[#24786D] text-white capitalize">create an account</button>
        )
      }

     

          

    </form>
    

   </div>
    </div>
  )
}

export default Form