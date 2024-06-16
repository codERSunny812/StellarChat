const StatusView = ({ statuses, showAllUser }) => {
    return (
        <div className="status flex  gap-2 items-center justify-center">
            {statuses.map((status) => {
                const user = showAllUser.find((userData) => userData.userId === status.userId);
                return user ? (
                    <div className="" key={status._id}>
                        <img src={user.img} alt={user.fullName} className="h-12 w-12 rounded-full" />
                    </div>
                ) : null;
            })}
        </div>
    );
};

export default StatusView;
