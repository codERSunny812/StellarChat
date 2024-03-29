import  {avtar} from '../../../constant.js'

const ConversationSection = (props) => {
  // console.log(props.conversations);

  return (
    <div>
      { props.conversations.map((props) => (
        
            <div key={props.conversationId} className='mx-2 my-6'>
              <div className="personChat flex items-center px-4 gap-5">
                <img src={avtar} className='h-16 w-16' alt="Profile" />
                <div className="">
                  <h1 className='capitalize text-xl'>{props.user.fullName}</h1>
                  <p className='text-gray-500'>hello </p>

                </div>
               
              </div>
            </div>
          ))}
    </div>
  )
}

export default ConversationSection