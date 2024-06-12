/* eslint-disable react/prop-types */
import { useState } from "react";
import Lottie from "lottie-react";
import Nogroup from "../anim/Nogroup.json";
import { RxCross2 } from "react-icons/rx";

const Group = ({ showAllUser, user }) => {
  const [groups, setGroups] = useState([]);
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="mt-2">
        {/* create button for the group */}

        <button
          type="button"
          className="bg-white text-black my-4 mx-4 py-2 px-2 rounded-xl capitalize"
          onClick={() => setModal(true)}
        >
          create a group +
        </button>

        {/* modal to show the peoples */}

        { modal && (
                <div className="absolute top-5 left-96 z-50 flex justify-center ">
            <div className="bg-lime-400 h-96 overflow-y-scroll rounded-xl">
              {showAllUser.map(({ email, fullName, userId, img }) => {
                // Use parentheses for conditional rendering
                return userId !== user.id ? (
                  <div
                    className="cursor-pointer flex items-center px-4 py-4 border-b"
                    key={userId}
                    onClick={() => {  console.log(`the clicked user name is ${fullName} and user id is ${userId}`)}}
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
              })}

            </div>
              <RxCross2 color="black" className="h-6 w-6 cursor-pointer" onClick={()=>setModal(false)} />
          </div>
        )}

        {/* conditional rendering to show the group */}

        {groups.length > 0 ? (
          <h1>these are the groups</h1>
        ) : (
          <div className="flex flex-col justify-center items-center py-4 px-2 my-5">
            <Lottie animationData={Nogroup} className="h-48" />
            <h1 className="text-white text-2xl">No group found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Group;
