/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { IoVideocamOutline, IoCallOutline } from "react-icons/io5";
const CallSection = ({ showAllUser, user }) => {
  return (
    <>
      {
        // eslint-disable-next-line react/prop-types
        showAllUser.map(({ userInfo: { email, fullName, userId, img } }) => {
          // Use parentheses for conditional rendering
          return user?.id != userId ? (
            <div
              className="cursor-pointer flex items-center px-4 py-4 border-b"
              key={userId}
            >
              <div className="flex  items-center justify-between w-full">
                <div className="flex items-center">
                  <img src={img} className="h-16 w-16 rounded-full" alt="h" />
                  <h1 className="mx-2 capitalize font-bold text-lg">
                    {fullName}
                  </h1>
                </div>
                <div className=" flex mx-4">
                  <IoCallOutline className=" h-7 w-7 mx-1" />
                  <IoVideocamOutline className="h-7 w-7 mx-1" />
                </div>
              </div>
            </div>
          ) : null;
        })
      }
    </>
  );
};

export default CallSection
