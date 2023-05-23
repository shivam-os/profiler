import { useState, createContext } from "react";

//User context with null as initial value
const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
