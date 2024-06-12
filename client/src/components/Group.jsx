/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Nogroup from "../anim/Nogroup.json";
import { RxCross2 } from "react-icons/rx";

const Group = ({ showAllUser, user }) => {
  // console.log(user.id)
  const [groups, setGroups] = useState([]);
  const [modal, setModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedUser, setSelectedUser] = useState([])

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/user-group/${user.id}`, {
          method: 'GET',
          credentials: 'include' // Ensures cookies are included in the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }

        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, [user.id]);


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

  console.log("the value of the group is:");
  console.log(groups);


  const handleCreateGroup = async () => {
    alert("hello")
    // const memberIds = selectedUser.map(user => user.userId);
    // console.log(memberIds)
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

      const data = await response.json();
      console.log('Group created:', data);
      // setGroups([...groups, data.data]);
      setModal(false);
      setGroupName('');
      setSelectedUser([]);
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
          <div className="absolute top-5 left-96 z-50 flex flex-col justify-center bg-[#ffff] shadow-3xl px-4 rounded-lg ">
            {/* top part of the model  */}
            <div className="topPart flex justify-between items-center my-2 mx-2">

              <h1 className="text-lg font-semibold capitalize">create the group</h1>

              <RxCross2
                color="black"
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
            <div className="bg-lime-400 h-96 overflow-y-scroll rounded-xl">
              {showAllUser.map(({ email, fullName, userId, img }) => {
                // Use parentheses for conditional rendering
                return userId !== user.id ? (
                  <div
                    className="cursor-pointer flex items-center px-4 py-4 border-b"
                    key={userId}
                    onClick={() => handleUserClick({userId , fullName})}
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


            {/* end part of the model  */}
            <button 
            type="button" 
            className="border-none outline-none bg-black text-white w-1/2 mx-auto py-2 px-1 rounded-3xl my-4"
              onClick={() => handleCreateGroup() }
            >create group</button>
          </div>
        )}

        {/* conditional rendering to show the group */}

        {groups.length > 0 ? (

          <h1>hello</h1>


        //  groups.data.map((group)=>{

        //   return(
        //     <div className="border-2 border-gray-400" key={group._id}>

        //       <img
        //         src="https://stock.adobe.com/search?k=friends+and+family+logo"
        //         className=" h-16 w-16 rounded-full"
        //         alt="user image"
        //       />

        //       <h1>{group.name}</h1>



        //     </div>
        //   )

        //  })
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
