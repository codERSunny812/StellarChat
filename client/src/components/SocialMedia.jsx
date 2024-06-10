import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className=" flex gap-4 px-4 my-1">
      <div className={`border-2  rounded-full p-2`}>
        <FaFacebook className="h-6 w-6" color="blue" />
      </div>
      <div className={`border-2  rounded-full p-2`}>
        <FcGoogle className="h-6 w-6" />
      </div>
      <div className={`border-2  rounded-full p-2`}>
        <FaApple className="h-6 w-6" color={`isLoggedIn ? 'white' : 'black'`} />
      </div>
    </div>
  );
};

export default SocialMedia;
