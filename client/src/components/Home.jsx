/* eslint-disable no-unused-vars */
import { avtar } from "../../constant";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoSearchCircle, IoVideocam, IoSend } from "react-icons/io5";
import { MdAddIcCall } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useEffect, useState } from "react";


const DashBoard = () => {
  const messages = [
    {
      id: 1,
      name: "shivam seth",
      status: "online",
      img: avtar,
    },
    {
      id: 2,
      name: "varun patel",
      status: "online",
      img: avtar,
    },
    {
      id: 3,
      name: "manas barnwal",
      status: "online",
      img: avtar,
    },
    {
      id: 4,
      name: "anushka gupta",
      status: "online",
      img: avtar,
    },
    {
      id: 5,
      name: "shivashish kaushik",
      status: "online",
      img: avtar,
    },
    {
      id: 6,
      name: "arun pal",
      status: "online",
      img: avtar,
    },
    {
      id: 7,
      name: "jadoo",
      status: "online",
      img: avtar,
    },
    {
      id: 8,
      name: "aryan verma",
      status: "online",
      img: avtar,
    }
  ];
  //state for the user who is currently active/open chat window
  const [allUser, setAllUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [isLogoutDropDown,setLogOutDropDown] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user-details')));

  //state to create a conversation with any user:
  const [conversation , setConversation] = useState([]);


  console.log("the register user in the local storage  is:"+user);

  useEffect(() => {
    setAllUser(messages);
    const loggedInUser= JSON.parse(localStorage.getItem('user-details'));

    console.log(`the data of the logged in user is ${loggedInUser}`);

    // fetch for the user for  the conversation
    const fetchConversation = async()=>{
      const res = await fetch(`http://localhost:3000/api/conversation/${loggedInUser.id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      });
      console.log(res); 
      const resData = await  res.json();
      setConversation(resData);

    }
    fetchConversation();
  }, []);

  console.log(conversation);



  
  // search function for the user
  const searchUser = () => {
    // console.log("Search button clicked");
    // console.log("word is entered")
    // console.log("Search word:", searchWord);
    // console.log("All users:", allUser);

    const filterUser = allUser.filter((user) => {
      return user.name.toLowerCase().includes(searchWord.trim().toLowerCase());
    });

    // console.log("Filtered users:", filterUser);

    setFilteredUser(filterUser);
    // console.log("filtered user  in state : ", filteredUser);
  };


  return (
    <div className="">
      <div className="h-screen grid grid-cols-12 overflow-hidden">
        {/* left box */}
        <div className="h-screen  md:block col-span-3 overflow-auto bg-[#5D3587]">
          {/* top part */}
          <div className="flex  items-center justify-between">
            <div className="flex items-center px-4 py-4">
              <div className="image border-2 border-black rounded-full">
                <img
                  src="https://xsgames.co/randomusers/assets/avatars/male/63.jpg"
                  alt="user image"
                  height={60}
                  width={60}
                  className="rounded-full"
                />
              </div>

              <div className="accountInfo ml-6 text-white">
                <h1 className="text-xl capitalize">{user.fullName}</h1>
                <h2 className="text-lg font-light">my account</h2>
              </div>
            </div>

            <div className="end_icons">
              <PiDotsThreeCircleFill className="h-9 w-9 cursor-pointer" onClick={()=>setLogOutDropDown(!isLogoutDropDown)} color="white"/>
              {
                isLogoutDropDown && <div className=" h-10 w-25 absolute left-[245px] bg-[#A367B1] top-[60px] capitalize text-white flex items-center justify-center rounded-lg px-3">
                  <h1>log out</h1>
                  <CiLogout />
                </div>
              }
              
            </div>
          </div>
          <hr />
          
          {/* messages section  */}
          <div className="messages ">
            {/* search panel to search people */}
            <div className="searchBar  flex items-center">
              <input
                type="search"
                placeholder="search people"
                className="border-2 border-black mx-2 my-2 w-3/4 border-none bg-transparent  px-4 py-2 outline-blue-500 placeholder:px-1 placeholder:capitalize"
                value={searchWord}
                onChange={(e) => {
                  e.preventDefault();
                  setSearchWord(e.target.value);
                  searchUser();
                  // console.log(searchWord);
                }}
              />
              <IoSearchCircle
                className="h-10 w-10 mx-1 my-1"
                
                color="white"
              />
            </div>

            <h1 className="capitalize px-3 mt-2 text-white">messages</h1>
            {filteredUser.length != 0
              ? filteredUser.map(({ name, status, img }) => {
                  return (
                    <div
                      className=" flex  items-center px-4 py-4  text-white border-b-2 border-b-rose-50
                      border-2 border-white"
                      key={name}
                      onClick={()=> console.log("hello")}

                    >
                      <img src={img} height={60} width={60} alt={name} />
                      <div className="accountInfo ml-6">
                        <h1 className="text-lg">{name}</h1>
                        <h2 className="text-sm font-light">{status}</h2>
                      </div>
                    </div>
                  );
                })
              : allUser.map(({ name, status, img }) => {
                  return (
                    <div className=" flex  items-center px-4 py-4 border-b " 
                    key={name}
                    onClick={()=> console.log("hello ")}
                    >
                      <img src={img} height={60} width={60} alt={name} />
                      <div className="accountInfo ml-6 text-white">
                        <h1 className="text-lg">{name}</h1>
                        <h2 className="text-sm font-light">{status}</h2>
                      </div>
                      <hr />
                    </div>
                  );
                })}
          </div>
        </div>

        {/* middle box */}
        <div className=" col-span-6">
          <div className=" flex items-center justify-between bg-[#392467] shadow-3xl rounded-lg py-1 mt-2 mx-1">
            <div className="px-4 flex items-center ">
              <img
                src={avtar}
                alt="user image"
                height={50}
                width={50}
                className="py-1"
              />
              <h1 className="px-4  text-white">
                <h1 className="capitalize font-medium text-lg">  sunny</h1>
                <span>status</span>              
              </h1>
              
            </div>
            <div className="icons flex mx-3">
              <MdAddIcCall
                className="mr-2 h-6 w-6 cursor-pointer"
                color="white"
              />
              <IoVideocam
                className="mr-2 h-6 w-6 cursor-pointer"
                color="white"
              />
            </div>
          </div>

          {/* chats section */}

          <div className=" h-[75%] overflow-scroll w-full">
            <div className=" mx-3 my-2">
              <div className=" max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-1 font-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-4xl  bg-[#A367B1] text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>

              <div className="max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-1 font-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-4xl  bg-[#A367B1] text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>

              <div className=" max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-1 font-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-4xl  bg-[#A367B1] text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>

              <div className=" max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-1 font-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className="max-w-[40%] rounded-4xl  bg-[#A367B1] text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-1 font-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-4xl  bg-[#A367B1] text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-1 font-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-4xl  bg-[#A367B1] text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
            </div>
          </div>
          <hr />

          {/* input box for sending the  messages  */}
          <div className="my-2 mx-2  py-3 mb-1 bg-[#392467] flex items-center justify-center rounded-lg">
            <BsFillEmojiSmileFill color="white" />

            <input
              type="text"
              name="message"
              className="border-none py-2 w-3/4 outline-none bg-transparent placeholder:capitalize placeholder:px-2 bg-white rounded-lg mx-4"
              placeholder="type your message.... "
            />
            <IoSend className="h-5 w-5 mx-2 cursor-pointer" color="white" />
            <FaPlusCircle className="h-5 w-5 mx-2 cursor-pointer" color="white" />
          </div>
        </div>
        {/* right box */}
        <div className="col-span-3 flex items-center justify-center bg-[#5D3587] text-white">
          more info about the account here
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
