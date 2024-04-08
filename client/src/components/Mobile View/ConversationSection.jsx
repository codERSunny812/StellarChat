/* eslint-disable react/prop-types */

const ConversationSection = ({conversations , handleConversationClick}) => {

  console.log(conversations)
  

  return (
    <div>
      {conversations.map(({user:{email , fullName , receiverId , img} , conversationId}) => (
        
            <div key={conversationId} className='mx-2 my-6'>
              <div className="personChat flex items-center px-4 gap-5 cursor-pointer" 
              onClick={()=> handleConversationClick(conversationId , fullName , receiverId , img)}
              >
                <img src={img} className='h-16 w-16 rounded-full' alt="Profile" />
                <div className="">
                  <h1 className='capitalize text-xl'>{fullName}</h1>
                  <p className='text-gray-500'>{email}</p>

                </div>
               
              </div>
            </div>
          ))}
        
    </div>
  )
}

export default ConversationSection