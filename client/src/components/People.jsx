/* eslint-disable react/prop-types */
import { avtar } from "../../constant";

const People = ({ showAllUser, user, createConversation }) => {
  return (
   <>
          <div className="col-span-3  bg-[#5D3587] text-white h-screen">
              <div className="top capitalize h-[10%] mx-4 mt-16 font-semibold text-lg ">
                  <h1>people</h1>
              </div>
              {/* show all the user which */}
              <div className="people h-3/4 overflow-scroll">
                  {showAllUser.map(({ userInfo: { email, fullName, userId } }) => {
                      // Use parentheses for conditional rendering
                      return userId !== user.id ? (
                          <div
                              className="cursor-pointer flex items-center px-4 py-4 border-b"
                              key={Math.random()}
                              onClick={() => {
                                  createConversation({
                                      senderId: user.id,
                                      receiverId: userId,
                                  });
                              }}
                          >
                              <img src={avtar} height={60} width={60} alt="user image" />
                              <div className="accountInfo ml-6 text-white">
                                  <h1 className="text-lg">{fullName}</h1>
                                  <h2 className="text-sm font-light">{email}</h2>
                              </div>
                              <hr />
                          </div>
                      ) : null; // Return null if the condition is not met
                  })}
              </div>
          </div>
   </>
  )
}

export default People