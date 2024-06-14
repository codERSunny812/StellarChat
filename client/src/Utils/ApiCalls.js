export const fetchConversations = async (userId) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/conversation/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    return res.json();
};



export const fetchAllUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/users`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
    });
    return res.json();
};

