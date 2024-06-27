import { useState } from "react";
import PropTypes from 'prop-types';
import StatusModal from './StatusModel';

const StatusView = ({ status, showAllUser, user }) => {
  const [showStatus, setShowStatus] = useState(false);

  const allUserData = showAllUser.find(
    (userData) => userData?.userId === status?.userId
  );

  const handleImageClick = () => {
    setShowStatus(true);
  };

  const handleCloseModal = () => {
    setShowStatus(false);
  };

  return (
    <div className="relative">
      <img
        src={allUserData?.img}
        alt={allUserData?.fullName}
        className="h-12 w-12 rounded-full object-cover cursor-pointer"
        onClick={handleImageClick}
      />
      <StatusModal isOpen={showStatus} onClose={handleCloseModal} status={status} />
    </div>
  );
};

StatusView.propTypes = {
  status: PropTypes.object.isRequired,
  showAllUser: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default StatusView;
