import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { UserContextProvider } from "./context/userContext";
import { ProfileContextProvider } from "./context/profileContext";
import AxiosInterceptor from "./components/AxiosInterceptor";
import { LoadinContextProvider } from "./context/loadingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
    <BrowserRouter>
      <UserContextProvider>
        <ProfileContextProvider>
          <LoadinContextProvider>
            <AxiosInterceptor>
              <App />
            </AxiosInterceptor>
          </LoadinContextProvider>
        </ProfileContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </ChakraProvider>
);
