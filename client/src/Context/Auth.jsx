import { createContext, useState } from "react";
import PropTypes from 'prop-types'


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

UserStatusContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserStatusContextProvider;
