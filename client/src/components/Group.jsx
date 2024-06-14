/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Nogroup from "../anim/Nogroup.json";
import { RxCross2 } from "react-icons/rx";
import { imageUrl as groupPic}  from '../Utils/Constant'
import {toast} from 'react-toastify'

const Group = ({ showAllUser, user, fetchMessages }) => {
  
  const [groups, setGroups] = useState([]);
  const [modal, setModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedUser, setSelectedUser] = useState([])


  console.log("the data of the state variables for the group component are:");
   console.log("group name is:")
  console.log(groupName);
  console.log("the modal is ");
  console.log(modal);
  console.log("selectedUser for the group is:");
  console.log(selectedUser);
  console.log("the groups which is created by the user is:");
  console.log(groups)


  const fetchGroupData  = async()=>{
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/user-group/${user.id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }
      const data = await response.json();
      console.log("the data of the group created by the user are:",data);
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  useEffect(()=>{
  fetchGroupData();
  },[])


  const handleUserClick = (selectedUser)=>{
    // console.log("a user is clicked");
    setSelectedUser((prevSelectedUsers) => {
      // check for the dublicay in the array
      if (prevSelectedUsers.some(user => user.userId === selectedUser.userId)) {
        return prevSelectedUsers.filter(user => user.userId !== selectedUser.userId);
      }
      return [...prevSelectedUsers, selectedUser];
    });
  }

  const handleCreateGroup = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/create-group`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: groupName, array:selectedUser, userId:user.id })
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      if(response.ok){
        toast("group created 🍀", {
          position: "top-center",
          theme: "dark",
          autoClose: 1500,
        });
        
        const data = await response.json();
       console.log("the group is successfully created:",data);
       fetchGroupData();
        setGroupName('');
        setSelectedUser([]);
        setModal(false);

      }
    
      
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

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

        {modal && (
          <div className="absolute top-5 left-96 z-50 flex flex-col justify-center bg-black shadow-3xl px-4 rounded-lg ">
            {/* top part of the model  */}
            <div className="topPart flex justify-between items-center my-2 mx-2">

              <h1 className="text-lg text-center font-semibold capitalize text-white">create the group</h1>

              <RxCross2
                color="white"
                className="h-6 w-6 cursor-pointer"
                onClick={() => setModal(false)}
              />
            </div>

            <input 
            type="text" 
            name="" 
            placeholder="enter the group name"  className="outline-none active:bg-slate-400  my-2 py-1 px-2 rounded-lg bg-slate-300"
            value={groupName}
            onChange={(e)=> setGroupName(e.target.value)}
            />

            {/* middle part of the model  */}
            <div className="bg-gray-400 h-96 overflow-y-scroll rounded-xl"
              onClick={() => fetchMessages() }
            >
              {showAllUser.map(({ email, fullName, userId, img }) => {
                // Use parentheses for conditional rendering
                return userId !== user.id ? (
                  <div
                    className="cursor-pointer flex items-center px-4 py-3 border-b"
                    key={userId}
                    onClick={() => handleUserClick({userId , fullName})}
                  >
                    <img
                      src={img}
                      className=" h-14 w-14 rounded-full"
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


            {/* end part of the model  */}
            <button 
            type="button" 
            className="border-none outline-none bg-white text- w-1/2 black mx-auto py-2 px-1 rounded-3xl my-4"
              onClick={() => handleCreateGroup() }
            >create group</button>
          </div>
        )}

        {/* conditional rendering to show the group */}

        {
        groups.length > 0 ? (

          groups.map((grp)=>{
            return(
              <div className="py-1 my-1 cursor-pointer hover:bg-gray-400" key={grp._id}>

                <div className="groups  flex items-center my-2 mx-4 hover:text-black capitalize">

                  <img src={groupPic} alt="" className="h-11 w-11 rounded-full" />
                  <p className="mx-4 text-white text-lg font-semibold">{grp.name}</p>
                </div>

              </div>
            )
          })

        
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
