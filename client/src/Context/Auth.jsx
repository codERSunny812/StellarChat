import { createContext, useState } from "react";

export const UserStatusContext = createContext();

const UserStatusContextProvider = (props) => {
  // state variable
  //initially the user is not loggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserStatusContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </UserStatusContext.Provider>
  );
};

export default UserStatusContextProvider;
