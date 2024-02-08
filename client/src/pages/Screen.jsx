import Splash from '../assets/Splash.jpg'

const Screen = () => {
  return (
      <div className=" flex justify-center items-center  bg-[#FAF9F6] h-full w-full">
          <div className=" rounded-lg bg-white shadow-3xl  h-screen w-[400px] flex justify-center items-center">
        <img src={Splash} alt="Appp logo" />
    </div>
   </div>
  )
}

export default Screen