import NoPeople from "../anim/NoPeople.json";
import Lottie from "lottie-react";
import { useState, useEffect, useRef } from "react";
import { FcPlus } from "react-icons/fc";
import StatusView from "./StatusView";
import axios from 'axios';
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const People = ({ showAllUser, user, createConversation, socket }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statuses, setStatuses] = useState([]);

  const scrollRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const maxVisibleItems = 4;

  const scrollLeft = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
      scrollRef.current.scrollLeft -= 100; // Adjust the value based on item width
    }
  };

  const scrollRight = () => {
    if (scrollIndex < statuses.length - maxVisibleItems) {
      setScrollIndex(scrollIndex + 1);
      scrollRef.current.scrollLeft += 100; // Adjust the value based on item width
    }
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    setSelectedFile(file);

    try {
      const formData = new FormData();
      formData.append('userId', user.id);
      formData.append('status-image', file);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/status/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        if (socket) {
          socket.emit('status-upload');
        }
        toast.info('Status is successfully uploaded');
        fetchStatuses();
      } else {
        alert("Status failed to upload");
      }
    } catch (error) {
      console.log(`Error in uploading the status: ${error}`);
    }
  };

  const fetchStatuses = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/status/view-status`);
    setStatuses(response?.data?.data || []);
  };

  useEffect(() => {
    fetchStatuses();
    if (socket) {
      socket.on('new-status', fetchStatuses);
    }

    return () => {
      if (socket) {
        socket.off('new-status', fetchStatuses);
      }
    };
  }, [socket]);

  console.log(statuses)

  return (
    <div className=" col-span-3 bg-[#5D3587] text-white">
      <div className="capitalize h-[10%] mx-4 mt-8 mb-2 font-semibold text-lg">
        <h1>people</h1>

        <div className="flex items-center justify-between">
          <FaCircleChevronLeft className="mx-1 cursor-pointer" onClick={scrollLeft} />

          <div className=" flex w-[400px] overflow-x-hidden" ref={scrollRef}>
            <form encType="multipart/form-data" className="flex items-center">
              <label htmlFor="file-input" className="relative">
                <img src={user.imageId} alt="" className="h-12 w-12 rounded-full object-cover" />
                <FcPlus className="absolute bottom-0 right-0" />
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  name="status-image"
                  onChange={handleFormData}
                />
              </label>
            </form>

            {statuses.length > 0 && (
              <div className="flex items-center">
                {statuses.slice(scrollIndex, scrollIndex + maxVisibleItems).map((status, index) => (
                  <StatusView key={index} status={status} showAllUser={showAllUser} user={user} />
                ))}
              </div>
            )}
          </div>

          <FaCircleChevronRight className="mx-1 cursor-pointer" onClick={scrollRight} />
        </div>
      </div>

      <div className="people h-[55%] overflow-y-scroll">
        {showAllUser.length > 1 ? (
          showAllUser.map(({ email, fullName, userId, img }) => (
            userId !== user.id && (
              <div
                className="cursor-pointer flex items-center px-4 py-[13px] border-b"
                key={userId}
                onClick={() => createConversation({ senderId: user.id, receiverId: userId })}
              >
                <img src={img} className="h-16 w-16 rounded-full object-cover" alt="user image" />
                <div className="accountInfo ml-6 text-white">
                  <h1 className="text-lg">{fullName}</h1>
                  <h2 className="text-sm font-light">{email}</h2>
                </div>
                <hr />
              </div>
            )
          ))
        ) : (
          <>
            <Lottie animationData={NoPeople} />
            <h1 className="text-center capitalize font-bold text-xl">no people are available</h1>
          </>
        )}
      </div>
      
    </div>
  );
};

People.propTypes = {
  showAllUser: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  createConversation: PropTypes.func.isRequired,
  socket: PropTypes.object,
};

export default People;
