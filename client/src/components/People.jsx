/* eslint-disable react/prop-types */
import NoPeople from "../anim/NoPeople.json";
import Lottie from "lottie-react";
import { useState } from "react";
import { FcPlus } from "react-icons/fc";

const People = ({ showAllUser, user, createConversation }) => {

  const [selectedFile , setSelectedFile] = useState(null);

  console.log(selectedFile);


  // handle the form data 
  const handleFormData = async (e) => {
    e.preventDefault();
    const file = e.target.files[0]; // Get the selected file directly from event

    if (!file) {
      console.log("No file selected");
      return; // Exit early if no file is selected
    }

    setSelectedFile(file); // Update selectedFile state with the selected file

    try {
      console.log("Inside the form submit function");
      const formData = new FormData();
      formData.append('userId', user.id);
      formData.append("statusImg", file); // Append the file to formData

      console.log(formData);

      // Upload the status
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/story/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert("Status failed to upload");
      }
    } catch (error) {
      console.log(`Error in uploading the status: ${error}`);
    }
  };


  return (
    <>
      <div className="border-2 border-pink-300 col-span-3  bg-[#5D3587] text-white">



          {/* heading and the status part  */}
          
        <div className="border-2 border-gray-400 capitalize h-[10%] mx-4 mt-8 mb-2 font-semibold text-lg ">

          <h1>people</h1>

           {/* status section  */}
            <div className="">
            <form encType='multipart/form-data'>
                <label htmlFor="file-input">
                  <img src={user.imageId} alt="" className="h-12 w-12 rounded-full" />
                  <FcPlus className="relative bottom-4 left-8" />
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    name="status-image"
                    onChange={(e)=> handleFormData(e) }
                  />
                </label>
              </form>
            </div>
      

         
        </div>

        {/* show all the user which */}
        <div className="people h-[55%] overflow-y-scroll">
          {
            //    check that user are present or not
            // we have added 1 because  of our own profile in array so subtracting it
            showAllUser.length > 1 ? (
              showAllUser.map(({ email, fullName, userId, img }) => {
                // Use parentheses for conditional rendering
                return userId !== user.id ? (
                  <div
                    className="cursor-pointer flex items-center px-4 py-[13px] border-b"
                    key={userId}
                    onClick={() => {
                      createConversation({
                        senderId: user.id,
                        receiverId: userId,
                      });
                    }}
                  >
                    <img
                      src={img}
                      className=" h-16 w-16 rounded-full"
                      alt="user image"
                    />
                    <div className="accountInfo ml-6 text-white">
                      <h1 className="text-lg">{fullName}</h1>
                      <h2 className="text-sm font-light">{email}</h2>
                    </div>
                    <hr />
                  </div>
                ) : null; // Return null if the condition is not met
              })
            ) : (
              <>
                <Lottie animationData={NoPeople} />
                <h1 className="text-center capitalize font-bold text-xl">
                  no people are available
                </h1>
              </>
            )
          }
        </div>
      </div>
    </>
  );
};

export default People;
