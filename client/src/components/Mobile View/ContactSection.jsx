import { avtar } from "../../../constant"

const ContactSection = ({ showAllUser }) => {
  console.log(showAllUser)
  return (
    <div>
      {
      showAllUser.map((props) => {
        // Use parentheses for conditional rendering
        return(
          <div
            className="cursor-pointer flex items-center px-4 py-4 border-b"
            key={Math.random()}
          >
            <img src={avtar} height={60} width={60} alt="h" />
            <div className="accountInfo ml-6 text-white">
              <h1 className="text-lg text-black">{props?.userInfo?.fullName}</h1>
              <h2 className="text-sm font-light text-black">{props?.userInfo?.email}</h2>
            </div>
            <hr />
          </div>
        )
      })}
    </div>
  )
}

export default ContactSection