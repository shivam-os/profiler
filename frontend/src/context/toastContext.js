import { useToast } from "@chakra-ui/react";
import { createContext } from "react";

const ToastContext = createContext(null);

export function ToastContextProvider({ children }) {
  const toast = useToast();

  const showToast = (msg, status) => {
    toast({
      description: msg,
      status: status,
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastContext;
