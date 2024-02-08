

const Input = ({
  label="",
  value="",
  type="",
  placeholder="",
}) => {
  return (
    <div className="  py-6 px-3 my-1">
      <label className=" capitalize block font-semibold text-lg text-[#24786D]" >{label}</label>
      <input name={value} type={type} placeholder={placeholder} className="border-b-2 border-black w-full outline-none  placeholder:text-gray-400 placeholder:px-2 placeholder:capitalize" />

    </div>
  )
}

export default Input;