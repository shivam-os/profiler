import { useState, createContext } from "react";

//User context with null as initial value
const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, profiles, setProfiles }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
