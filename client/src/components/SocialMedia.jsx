import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useParams } from "react-router-dom";

const SocialMedia = () => {
    // const { id  } = useParams();
    // console.log(id);
    // const fun = useParams();
    // console.log(fun)
    // Define a function to determine the border color based on the route parameter
    const getBorderColor = () => {
        // return id === "createaccount" ? "black" : "white";
    };
    
   return (
      <div className=" flex gap-4 px-4 my-1">
           <div className={`border-2 border-${getBorderColor()} rounded-full p-2`}>
               <FaFacebook className='h-6 w-6' color='blue' />
           </div>
           <div className={`border-2 border-${getBorderColor()} rounded-full p-2`}>
               <FcGoogle className='h-6 w-6' />
           </div>
           <div className={`border-2 border-${getBorderColor()} rounded-full p-2`}>
               <FaApple className='h-6 w-6' color='black' />
           </div>
    </div>
  )
}

export default SocialMedia