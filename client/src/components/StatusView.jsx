import { useState } from "react";
import PropTypes from 'prop-types';

const StatusView = ({ statuses, showAllUser, user }) => {
  // console.log(showAllUser);
  // console.log(statuses)
  const [showStatus , setShowStatus] = useState(false);
  return (
    <div className="flex space-x-4">
      {statuses.map((status) => {
        // checking the post uploaded by the loggedIn user
        if (user?.id === status?.userId) {
          return;
        }
        const allUserData = showAllUser.find(
          (userData) => userData?.userId === status?.userId
        );
        return user ? (
          <div key={status?._id}>
            <img
              src={allUserData?.img}
              alt={allUserData?.fullName}
              className="h-12 w-12 rounded-full object-cover"
              onClick={()=> setShowStatus(true)}
            />


                {

                    showStatus && (

                    <div className="image border-2 border-red-700 absolute top-0 ">

                    <img src={status?.statusImg} alt="" />

                    </div>
                    )

                }
          </div>
        //   the image status 
        

        
        ) : null;
      })}
    </div>
  );
};



StatusView.propTypes={
  statuses:PropTypes.array.isRequired,
  showAllUser:PropTypes.array.isRequired,
  user:PropTypes.object.isRequired
}

export default StatusView;
