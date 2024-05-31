import { RiAccountPinBoxLine } from "react-icons/ri";
import { BsChatSquareDots } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbMobiledata } from "react-icons/tb";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GoCrossReference } from "react-icons/go";


const SettingSection = ({user}) => {
  console.log(user)
  return (
    <>
      <div>
        <div className="flex items-center  mx-[24px] my-[10px] px-3">
          <img src={user?.imageId} alt="user image" className="h-20 w-20 rounded-full" />
          <div className="userBio mx-7 capitalize">
            <h1 className="font-semibold text-[24px]">{user.fullName}</h1>
            <p className="text-[15px]">सर्वेषाम् स्वस्तिर्भवतु🫰</p>
          </div>
        </div>

        <div className="flex flex-col mt-12 h-[400px] overflow-y-scroll gap-7">

          <div className=" account flex items-center mx-5 px-5 py-1">

            <div className=" bg-gray-400 rounded-full p-2">
              <RiAccountPinBoxLine className="h-8 w-8  text-[#F2F8F7] " />
            </div>

            <div className="mx-3">
              <h1 className="capitalize  font-semibold text-[18px]">account</h1>
              <p className="text-[13px]">privacy , security , change number</p>
            </div>

          </div>

          <div className="chats flex items-center mx-5  px-5 py-1">

            <div className=" bg-gray-400 rounded-full p-2">
              <BsChatSquareDots className="h-8 w-8  text-[#F2F8F7] " />
            </div>

            <div className="mx-3">
              <h1 className="capitalize  font-semibold text-[18px]">chats</h1>
              <p className="text-[13px]">chats history , theme , wallpapers</p>
            </div>

          </div>

          <div className="notifications flex items-center mx-5  px-5 py-1">

            <div className=" bg-gray-400 rounded-full p-2">
              <IoIosNotificationsOutline className="h-8 w-8  text-[#F2F8F7] " />
            </div>

            <div className="mx-3">
              <h1 className="capitalize  font-semibold text-[18px]">notifications</h1>
              <p className="text-[13px]">message , groups and others</p>
            </div>

          </div>

          <div className="help flex items-center mx-5  px-5 py-1">

            <div className=" bg-gray-400 rounded-full p-2">
              <IoIosHelpCircleOutline className="h-8 w-8  text-[#F2F8F7] " />
            </div>

            <div className="mx-3">
              <h1 className="capitalize  font-semibold text-[18px]">help</h1>
              <p className="text-[13px]">help center , contact us  , privacy policy </p>
            </div>

          </div>

          <div className="data flex items-center mx-5  px-5 py-1">

            <div className=" bg-gray-400 rounded-full p-2">
              <TbMobiledata className="h-8 w-8  text-[#F2F8F7] " />
            </div>

            <div className="mx-3">
              <h1 className="capitalize  font-semibold text-[18px]">storage and  data</h1>
              <p className="text-[13px]">network usage , storage usage</p>
            </div>

          </div>

          <div className="invite flex items-center mx-5 px-5 py-1">

            <div className=" bg-gray-400 rounded-full p-2">
              <GoCrossReference className="h-8 w-8  text-[#F2F8F7] " />
            </div>

            <div className="mx-3">
              <h1 className="capitalize  font-semibold text-[18px]">invite</h1>
            </div>

          </div>

        </div>


      </div>
    </>
  );
};

export default SettingSection;
