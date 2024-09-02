/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
const UserContext = createContext();

export function UserContextProvider(props) {
  useEffect(() => {});

  return (
    <UserContext.Provider value={{}}>{props.children}</UserContext.Provider>
  );
}

export default UserContext;
