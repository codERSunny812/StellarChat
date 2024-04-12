import { useContext, useState } from "react";
import Input from "../components/Input";
import { UserStatusContext } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {

  const [profilePicture, setProfilePicture] = useState(null);
  const { setIsLoggedIn } = useContext(UserStatusContext);
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const initialData = {
    fullName: "",
    email: "",
    password: "",
    image_Id: "",
  };

  // state to store the data  of the user
  const [data, setData] = useState(initialData);

  console.log(data);

  // function to handle the form submit
  const handleFormSubmit = async (e) => {
    console.log("inside the from submit function");

    e.preventDefault();

    if(!data.email || !data.fullName || !data.password){
      toast.warn("enter the data",{
        position:"top-center",
        theme:"dark"
      })
    }

    if (!profilePicture || !profilePicture.type.startsWith("image")) {
      toast.error("Please select a valid image  file", {
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


    // checking the size of the uploaded image

    const img = new Image(); // Create a new Image object
    img.onload = () => {
      const width = img.width; // Get the width of the image
      const height = img.height; // Get the height of the image
      if (width !== 100 || height !== 100) {
        toast.error("Image dimensions must be 100x100 pixels", {
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
      img.src = URL.createObjectURL(profilePicture); // Set the source of the image
    }
    
    



    

    // show toast if the password doesnt matched
    if (data.password != pass) {
      toast.warn("password didn't matched", {
        position: "top-center",
        theme: "dark",
      });

      return;
    }

    // Display loading message using toast.promise
    const registrationToastId = toast.promise(
      new Promise((resolve, reject) => {
        // Simulate registration process
        setTimeout(() => {
          // Resolve promise after successful registration
          resolve();
        }, 2000); // Simulated delay for registration
      }),
      {
        pending: "Registering...",
        success: "Registration successful!",
        error: "Registration failed!",
      },
      {
        position: "top-center",
        autoClose: 2600,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("uploaded_file", profilePicture);

    // api fetch
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: formData,
    });

    //checking the response status
    if (res.status === 100) {
      toast.error("All fields are required");
    } else if (res.status === 204) {
      toast.error("User already exists");
    } else {
      setIsLoggedIn(true);
      navigate("/login");
      toast.info("User registred successfully", {
        position: "top-center",
        theme: `dark`,
      });
    }

    // Close loading message
    toast.dismiss(registrationToastId);
  };
 
  


  return (
    <div className="h-screen w-full flex justify-center items-center  bg-[#FAF9F6]">
      <div className=" h-screen w-[400px] rounded-xl shadow-lg bg-white">
        <form className=" my-2 flex flex-col" onSubmit={handleFormSubmit}>
          <h1 className="capitalize text-center my-6 font-bold text-lg">
            sign up with the email
          </h1>

          <p className="px-9 capitalize text-gray-400 my-2">
            {" "}
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
            value={pass}
            onChange={(e) => setPass(e.target.value)}
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
