import Input from "../components/Input"

const Form = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center  bg-[#FAF9F6]">
   <div className=" h-screen w-[400px] rounded-xl shadow-lg bg-white">
    <form className=" my-4 flex flex-col">

      <h1 className="capitalize text-center my-6 font-bold text-lg">sign up with the email</h1>
      <p className="px-9 capitalize text-gray-400 my-5"> get chatting with your family and friends today by signing up for our chat app!</p>

      <Input label="  your name" type="text" placeholder="enter your full name"/>

      <Input label="your email" type="emial" placeholder="enter your email"/>

      <Input label="your password" type="password" placeholder="enter your password"/>

      <Input  label="confirm password" type="password" placeholder="re-enter your password"/>

          <button type="submit" className=" my-3 w-3/4 py-2 mx-auto px-3 rounded-2xl bg-[#24786D] text-white capitalize">create an account</button>

    </form>
    

   </div>
    </div>
  )
}

export default Form