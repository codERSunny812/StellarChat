// input fcomponent
const Input = ({ label, type, value, onChange}) => {
  return (
    <div className="  py-6 px-3 my-1">
      <label className=" capitalize block font-semibold text-lg text-[#24786D]" >{label}</label>
      <input name={value} type={type} className="border-b-2 border-black w-full outline-none  placeholder:text-gray-400 placeholder:px-2 placeholder:capitalize" onChange={onChange}
     />

    </div>
  )
}

export default Input;