import PropTypes from 'prop-types';

const StatusModal = ({ isOpen, onClose, status }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-black  rounded-lg max-w-lg w-full">
                <button
                    className="absolute top-1 right-2 h-7 w-7 text-white hover:text-gray-700"
                    onClick={onClose}
                >
                    &times;
                </button>
                <img src={status?.statusImg} alt="Status" className="object-cover w-full h-auto" />
            </div>
        </div>
    );
};

StatusModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    status: PropTypes.object,
};

export default StatusModal;
