import { avtar } from "../../constant";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoSearchCircle, IoVideocam, IoSend } from "react-icons/io5";
import { MdAddIcCall } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { useEffect, useState } from "react";


const DashBoard = () => {
  const messages = [
    {
      name: "shivam",
      status: "online",
      img: avtar,
    },
    {
      name: "varun",
      status: "online",
      img: avtar,
    },
    {
      name: "manas",
      status: "online",
      img: avtar,
    },
    {
      name: "anushka",
      status: "online",
      img: avtar,
    },
    {
      name: "shivashish",
      status: "online",
      img: avtar,
    },
      {
          name: "arun",
          status: "online",
          img: avtar,
      },
      {
          name: "jadoo",
          status: "online",
          img: avtar,
      },
  ];
  const [allUser, setAllUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);

  console.log("filteredUser" , filteredUser)
  const [searchWord,setSearchWord]=useState([]);

  useEffect(() => {
    setAllUser(messages);
    console.log(filteredUser);
    console.log(allUser);
  },[]);



  // search function for the user
  const searchUser = ()=>{
    console.log("the button is clicked")
    const filterUser = allUser.filter((user)=>{
      // console.log(user.name)
      user?.name?.toLowerCase()?.includes(searchWord?.toLowerCase());
     
      console.log(user);
      console.log(searchWord);
    })
    // console.log(filterUser);
    setFilteredUser(filterUser)
  }

  return (
    <div className="">
      <div className="h-screen grid grid-cols-12 overflow-hidden">
        {/* left box */}
        <div className="h-screen col-span-3 overflow-scroll">
          {/* top part */}
          <div className="flex  items-center justify-between ">
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

              <div className="accountInfo ml-6">
                <h1 className="text-xl capitalize">sunny</h1>
                <h2 className="text-lg font-light">my account</h2>
              </div>
            </div>

            <div className="end_icons">
              <PiDotsThreeCircleFill className="h-9 w-9" />
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
                className="border-2 border-black mx-2 my-2 w-3/4 border-none px-4 py-2 outline-blue-500 placeholder:px-1 placeholder:capitalize"
                value={searchWord}
                onChange={(e)=>setSearchWord(e.target.value)}
              />
              <IoSearchCircle className="h-10 w-10 mx-1 my-1" 
              onClick={searchUser}
              />
            </div>

            <h1 className="capitalize px-3 mt-2">messages</h1>
            {
              filteredUser.length> 0 ? (
             
                  filteredUser.map(({ name, status, img }) => {
                    return (
                      <div className=" flex  items-center px-4 py-4" key={name}>
                        <img src={img} height={60} width={60} alt={name} />
                        <div className="accountInfo ml-6">
                          <h1 className="text-lg">{name}</h1>
                          <h2 className="text-sm font-light">{status}</h2>
                        </div>
                      </div>
                    )
                  })
         
               
              ) : (
              
                    allUser.map(({ name, status, img })=>{
                    return(
                      <div className=" flex  items-center px-4 py-4" key={name}>
                        <img src={img} height={60} width={60} alt={name} />
                        <div className="accountInfo ml-6">
                          <h1 className="text-lg">{name}</h1>
                          <h2 className="text-sm font-light">{status}</h2>
                        </div>
                        <hr />
                      
                      </div>
                     
                    )
                  })
              
              )
            }
          </div>
        </div>

        {/* middle box */}
        <div className=" col-span-6">
          <div className=" flex items-center justify-between bg-gray-500 shadow-3xl rounded-lg py-1 mt-2 mx-1">
            <div className="px-4 flex items-center ">
              <img
                src={avtar}
                alt="user image"
                height={50}
                width={50}
                className="py-1"
              />
              <h1 className="px-4 capitalize font-medium text-lg text-white">
                sunny
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
              <div className=" max-w-[40%] rounded-4xl bg-blue-500 text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>

              <div className="max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-1 font-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-4xl bg-blue-500 text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>

              <div className=" max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-1 font-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-4xl bg-blue-500 text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>

              <div className=" max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-1 font-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className="max-w-[40%] rounded-4xl bg-blue-500 text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-1 font-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-4xl bg-blue-500 text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-5xl bg-gray-300 text-black px-2 py-1 font-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
              <div className=" max-w-[40%] rounded-4xl bg-blue-500 text-white px-2 py-1 font-normal ml-auto">
                Lorem ipsum dolor sit, amet consectetur.
              </div>
            </div>
          </div>
          <hr />

          {/* input box for sending the  messages  */}
          <div className="my-2 py-3 mb-1 bg-gray-400 flex items-center justify-center">
                     
            <BsFillEmojiSmileFill/>         
            
            <input
              type="text"
              name="message"
              className="border-none py-2 w-3/4 outline-none bg-transparent placeholder:capitalize placeholder:px-2 bg-white rounded-lg mx-4"
              placeholder="type your message.... "
            />
            <IoSend className="h-5 w-5 mx-2 cursor-pointer" />
            <FaPlusCircle className="h-5 w-5 mx-2 cursor-pointer" />
          </div>
        </div>
        {/* right box */}
        <div className="col-span-3 ">hello Im box 3</div>
      </div>
    </div>
  );
};

export default DashBoard;
