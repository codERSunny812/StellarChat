

const Input = ({
  label="",
  value="",
  type="",
  placeholder="",
}) => {
  return (
    <div className="py-2 px-3">
      <label className=" capitalize block font-semibold text-lg" >{label}</label>
      <input name={value} type={type} placeholder={placeholder} className="my-2 px-2 py-2 rounded-lg placeholder:capitalize outline-none bg-slate-300 border-2 border-gray-400 placeholder:text-black font-thin" />

    </div>
  )
}

export default Input;