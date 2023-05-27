import { useState, createContext } from "react";

//User context with null as initial value
const LoadingContext = createContext(null);

export function LoadinContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingContext;
