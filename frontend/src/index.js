import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { UserContextProvider } from "./context/userContext";
import { ProfileContextProvider } from "./context/profileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <UserContextProvider>
          <ProfileContextProvider>
            <App />
          </ProfileContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </ChakraProvider>
);
