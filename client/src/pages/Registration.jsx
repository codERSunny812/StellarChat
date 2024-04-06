import { useContext, useState } from "react";
import Input from "../components/Input";
import { UserStatusContext } from "../Context/Auth";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
    const navigate = useNavigate();


    const initialData = {
        fullName: "",
        email: "",
        password: "",
        image_Id: "",
    };

    // state to store the data  of the user
    const [data, setData] = useState(initialData);

    console.log(data)



    // function to handle the form submit
    const handleFormSubmit = async (e) => {

        console.log("inside the from submit function");

        e.preventDefault();

            if (!profilePicture || !profilePicture.type.startsWith('image')) {
                alert("Please select a valid image file.");
                return;
            }
            if (profilePicture.size > 1024 * 1024) {
                alert("File size exceeds 1MB. Please select a smaller file.");
                return;
            }

        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("uploaded_file", profilePicture);

        // api fetch 
        const res = await fetch(
            "http://localhost:3000/api/register",
            {
                method: "POST",
                body: formData
            }
        );

        console.log("the response of the api is:")
        console.log(res);

        //checking the response status
        if (res.status === 100) {
            alert("all field are required");
        }else if (res.status === 204) {
            alert("user already exist");
        }else {
            const responseData = await res.json();
            console.log("the repsones of the data in json is:")
            console.log(responseData);
            console.log("the user is successfully registred");
            setIsLoggedIn(true);
            navigate("/login");
        }
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
                    <Input label="confirm password" type="password" />

                   <Input type="file" label="choose any picture"
                      name="uploaded_file"
                      onChange={(e) => {
                          const selectedFile = e.target.files[0];
                          if (selectedFile) {
                              setProfilePicture(selectedFile);
                              setData({ ...data, image_Id: selectedFile });
                          } else {
                              console.error('No file selected or invalid file type');
                          }
                      }}
                  />

                  <button
                      type="submit"
                      className="my-3 w-3/4 py-2 mx-auto px-3 rounded-2xl bg-[#24786D] text-white capitalize active:bg-black active:text-white">
                      Create an Account
                  </button>

              </form>
          </div>
      </div>
  )
}

export default Registration