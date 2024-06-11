import { useContext, useState } from "react";
import Input from "../components/Input";
import { UserStatusContext } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  
  const [profilePicture, setProfilePicture] = useState(null);
  const { setIsLoggedIn } = useContext(UserStatusContext);
  const [retypePass, setretypePass] = useState("");
  const navigate = useNavigate();
  const initialData = {
    fullName: "",
    email: "",
    password: "",
    image_Id: "",
  };

  console.log(import.meta.env.VITE_BACKEND_CHAT_APP_URL);

  const [data, setData] = useState(initialData);

  const handleFormSubmit = async (e) => {

    e.preventDefault();

    if (!data.email || !data.fullName || !data.password) {
      toast.warn("Please fill the input boxes", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    if (!profilePicture || !profilePicture.type.startsWith("image")) {
      toast.error("Please select a valid image file", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (profilePicture.size > 1024 * 1024) {
      toast.warn("File Size limit exceeds 1MB. Please Select a smaller image", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (data.password !== retypePass) {
      toast.warn("password didn't match", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("uploaded_file", profilePicture);

    // eslint-disable-next-line no-async-promise-executor
    const registrationPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/register`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (res.status === 400) {
          reject("All fields are required📌");
        } else if (res.status === 409) {
          reject("User already exists💢");
        } else if (res.status >= 200 && res.status < 300) {
          setIsLoggedIn(true);
          resolve("Registration successful!✅");
        }
      } catch (error) {
        reject(" Error in Registration");
      }
    });

    toast.promise(
      registrationPromise,
      {
        pending: "Registering...",
        success: {
          render() {
            setTimeout(() => {
              navigate("/login");
            }, 1000); // Delay to allow toast to display before navigation
            return "Registration successful!👌";
          },
        },
        error: {
          render({ data }) {
            return data; // data contains the specific error message
          },
        },
      },
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  return (
    <div className="h-screen w-full flex justify-center items-center  bg-[#FAF9F6]">
      <div className=" h-screen w-[400px] rounded-xl shadow-lg bg-white">
        <form className=" my-2 flex flex-col" onSubmit={handleFormSubmit}>
          <h1 className="capitalize text-center my-6 font-bold text-lg">
            sign up with the email
          </h1>
          <p className="px-9 capitalize text-gray-400 my-2">
            get chatting with your family and friends today by signing up for
            our chat app!
          </p>
          <Input
            label="your full name"
            type="text"
            value={data.fullName}
            onChange={(e) => {
              setData({ ...data, fullName: e.target.value });
            }}
          />
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
          <Input
            label="confirm password"
            type="password"
            value={retypePass}
            onChange={(e) => setretypePass(e.target.value)}
          />
          <Input
            type="file"
            label="choose any picture"
            name="uploaded_file"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                setProfilePicture(selectedFile);
                setData({ ...data, image_Id: selectedFile });
              } else {
                console.error("No file selected or invalid file type");
              }
            }}
          />
          <button
            type="submit"
            className="my-3 w-3/4 py-2 mx-auto px-3 rounded-2xl bg-[#24786D] text-white capitalize active:bg-black active:text-white"
          >
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
