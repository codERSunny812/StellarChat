import Logo from '../assets/toplogo.png'
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AfterSplash = () => {
  return (
   <div className="  h-full w-full flex justify-center items-center">
    <div className=" h-screen w-[400px] bg-gradient-to-b from-custom-purple-light to-custom-purple-dark flex flex-col  items-center text-white">
       <img src={Logo} alt="App logo"  className='  border-white h-11 w-26 my-7' />   
              <h1 className='text-7xl capitalize px-5 font-sans my-5'>connect friends  <span className='font-semibold'>easily & quickly</span></h1>  
       <h2 className=' text-gray-400 capitalize my-5 px-3'>our app is the perfect way to get connected with the friends and family.</h2> 

       {/* login throught social media */}
       <div className="flex gap-4 px-4 my-1">
        <div className="facebook border-2 border-white   rounded-full p-2">
          <FaFacebook className='h-6 w-6' color='blue'/>
        </div>
        <div className="google border-2 border-white  rounded-full p-2">
        <FcGoogle className='h-6 w-6' />

        </div>
        <div className="apple border-2 border-white   rounded-full p-2">
        <FaApple className='h-6 w-6' color='white' />

        </div>


       </div>
      <div className=" uppercase text-sm  flex items-center mt-10">
        <hr className='w-44' />
        <span className='px-2'>or</span>
        <hr className='w-44' />
      </div>
              <Link to='/createaccount' className='border-none  text-black bg-white w-[60%] py-2 px-6 rounded-lg capitalize mt-9'>
                  <button type="submit" >sign up with the mail</button>
      </Link>
     


      <div className="my-2 text-gray-400">
        existing account ? <span className='capitalize text-white cursor-pointer'>log in</span>
      </div>
    
    </div>

   </div>
  )
}

export default AfterSplash;