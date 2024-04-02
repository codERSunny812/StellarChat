import Logo from "../assets/toplogo.png";
import { Link } from "react-router-dom";
import SocialMedia from "../components/SocialMedia";
import { useContext } from "react";
import { UserStatusContext } from "../Context/Auth";

const AfterSplash = () => {
  const { setIsLoggedIn } = useContext(UserStatusContext);
  return (
    <div className="md:h-screen h-full w-full flex md:justify-center items-center">
      <div className="border-2 border-yellow-500 md:h-screen h-screen md:w-[400px] bg-gradient-to-tr from-custom-purple-light to-custom-purple-dark flex flex-col  items-center text-white">
        <img
          src={Logo}
          alt="App logo"
          className="  border-white h-11 w-26 md:my-7 my-5"
        />
        <h1 className="md:text-7xl text-6xl capitalize px-5 font-sans md:my-5 my-3">
          connect friends{" "}
          <span className="font-semibold my-2">easily & quickly</span>
        </h1>
        <h2 className=" text-gray-400 capitalize my-5 px-3">
          our app is the perfect way to get connected with the friends and
          family.
        </h2>

        {/* login throught social media */}
        <SocialMedia />

        <div className=" uppercase text-sm  flex items-center md:mt-10 mt-6">
          <hr className="w-44" />
          <span className="px-2">or</span>
          <hr className="w-44" />
        </div>
        <Link
          to="/register"
          className="border-none  text-black bg-white w-[60%] py-2 px-6 rounded-lg capitalize mt-9"
        >
          <button type="submit">sign up with the mail</button>
        </Link>

        <div className="my-2 text-gray-400">
          existing account ?{" "}
          <Link to="/login">
            <span
              className="capitalize text-white cursor-pointer"
              onClick={() => setIsLoggedIn(true)}
            >
              log in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AfterSplash;
