/* eslint-disable react/prop-types */
import NoPeople from "../anim/NoPeople.json";
import Lottie from "lottie-react";

const People = ({ showAllUser, user, createConversation }) => {
  return (
    <>
      <div className="col-span-3  bg-[#5D3587] text-white h-screen">
        <div className="top capitalize h-[10%] mx-4 mt-16 font-semibold text-lg ">
          <h1>people</h1>
        </div>
        {/* show all the user which */}
        <div className="people h-3/4 overflow-scroll">
          {
            //    check that user are present or not
            // we have added 1 because  of our own profile in array so subtracting it
            showAllUser.length > 1 ? (
              showAllUser.map(({ email, fullName, userId, img }) => {
                // Use parentheses for conditional rendering
                return userId !== user.id ? (
                  <div
                    className="cursor-pointer flex items-center px-4 py-4 border-b"
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
