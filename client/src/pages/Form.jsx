import Input from "../components/Input"

const Form = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
   <div className=" h-[600px] w-[400px] bg-gray-300 rounded-xl shadow-lg flex flex-col justify-center items-center">
    <form>
        <h1 className="text-center text-4xl font-bold pt-8 capitalize"> welcome</h1>
        <h2 className="text-center text-xl capitalize font-thin">sign up to get started</h2>
        <Input label="name" type="text" placeholder="enter your name"
        name="name"
        />
        <Input label="email id" type="email" placeholder="enter your email" name="email"/>

        <Input label="password" type="password" placeholder="enter your password" name="password" />
 </form>

      <button type="submit" className="px-2 py-2 bg-black text-white capitalize rounded-lg w-1/2">sign up</button>

      <div className="py-2">Already have an account ? <span className="text-blue-500 capitalize"> sign in </span></div>

   </div>
    </div>
  )
}

export default Form