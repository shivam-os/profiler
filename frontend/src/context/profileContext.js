import { useState, createContext } from "react";

export const ProfileContext = createContext(null);

export function ProfileContextProvider({ children }) {
  const [profiles, setProfiles] = useState([]);

  return (
    <ProfileContext.Provider value={{ profiles, setProfiles }}>
      {children}
    </ProfileContext.Provider>
  );
}
