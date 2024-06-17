import {useState , useEffect} from 'react'
import {io} from 'socket.io-client'

export const useSocket = (user, handleMessage) => {

    const [socket, setSocket] = useState(null);
    const [activeUser, setActiveUser] = useState([]);

    useEffect(() => {
        if (!user) return;

        const newSocket = io(import.meta.env.VITE_BACKEND_CHAT_APP_URL);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (!socket || !user) return;

        const userData = { id: user.id, name: user.fullName };

        socket.on("connect", () => {
            socket.emit("addUser", userData);
        });

        socket.on("getUser", (data) => {
            setActiveUser(data);
        });

        socket.on("getMessage", handleMessage);

        return () => {
            socket.off("connect");
            socket.off("getUser");
            socket.off("getMessage", handleMessage);
        };
    }, [socket, user, handleMessage]);

    return { socket, activeUser };
};
