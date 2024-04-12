import { useContext } from "react";
import { UserStatusContext } from "../Context/Auth";
import LoginPage from "./LoginPage";
import Registration from "./Registration";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {


  const { isLoggedIn } = useContext(UserStatusContext);

  console.log(isLoggedIn);

  return (
  
    <div className="h-screen w-full flex justify-center items-center  bg-[#FAF9F6]">
      {
        isLoggedIn ? (
          <LoginPage   />
        ) : (
          <Registration/>
        )
      }
    </div>
  );
};

export default Form;
