import { useContext, useState } from "react";
import Input from "../components/Input";
import SocialMedia from "../components/SocialMedia";
import { UserStatusContext } from "../Context/Auth";
import { useNavigate } from "react-router-dom";

const Form = () => {
  // tells the status of the user, if it is logged in or not.
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
  const [profilePicture , setProfilePicture] = useState(null);
  console.log(isLoggedIn);


  const initialData = {
    fullName: "",
    email: "",
    password: ""
  };

  const [data, setData] = useState(initialData);

  // for navigation to the home page
  const navigate = useNavigate();


//upload the file and set it  in the state  variable
  const onFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setProfilePicture(file); // Set the FormData object in state
  };





  console.log(data);
  // console.log(profilePicture);

  
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("the form is submit");
  

    const res = await fetch(
      `http://localhost:3000/api/${isLoggedIn ? "login" : "register"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
      }
    );

    //handle the response
    if (res.status == 500) {
      alert("all field are required");
    } else if (res.status == 404) {
      alert("user not found");
    } else if (res.status == 401) {
      alert("invalid credentials");
    } else {
      const responseData = await res.json();
      setIsLoggedIn(true);
      // Clear the form data after successful submission

      if (isLoggedIn && responseData.user.token) {
        console.log("inside");
        localStorage.setItem("user-token", responseData.user.token);
        localStorage.setItem("user-details", JSON.stringify(responseData.user));
        navigate("/home");
      }
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center  bg-[#FAF9F6]">
      <div className=" h-screen w-[400px] rounded-xl shadow-lg bg-white">
        <form className=" my-2 flex flex-col" autoComplete="off" encType="multipart/form-data">
          {isLoggedIn ? (
            <h1 className="capitalize text-center my-6 font-bold text-lg">
              log in to chatkro
            </h1>
          ) : (
            <h1 className="capitalize text-center my-6 font-bold text-lg">
              sign up with the email
            </h1>
          )}

          {isLoggedIn ? (
            <p className="px-9 capitalize text-gray-400 my-5">
              {" "}
              welcome back ! sign in using your social account or email to
              continue us
            </p>
          ) : (
            <p className="px-9 capitalize text-gray-400 my-2">
              {" "}
              get chatting with your family and friends today by signing up for
              our chat app!
            </p>
          )}

          {isLoggedIn && (
            <div className="flex items-center justify-center">
              <SocialMedia />
            </div>
          )}

          {isLoggedIn && (
            <div className=" uppercase text-sm  flex items-center mt-10">
              <hr className="w-44" />
              <span className="px-2">or</span>
              <hr className="w-44" />
            </div>
          )}

          {!isLoggedIn && (
            <Input
              label="your full name"
              type="text"
              value={data.fullName}
              onChange={(e) => {
                setData({ ...data, fullName: e.target.value });
              }}
            />
          )}

          <Input
            label="Your Email"
            type="email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />

          <Input
            label="Your Password"
            type="password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />

          {!isLoggedIn && <Input label="confirm password" type="password" />}

          {!isLoggedIn && <Input type="file" label="choose any picture" onChange={onFileUpload} />}

          <button
            type="submit"
            className="my-3 w-3/4 py-2 mx-auto px-3 rounded-2xl bg-[#24786D] text-white capitalize active:bg-black active:text-white"
            onClick={handleFormSubmit}
          >
            {isLoggedIn ? "Log In" : "Create an Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
