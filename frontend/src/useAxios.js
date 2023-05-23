import { useContext, useEffect } from "react";
import api from "./api/serverData";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/userContext";
import { useToast } from "@chakra-ui/react";
import displayToast from "./utils/toastHelper";

export default function useAxios() {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(UserContext);
  const toast = useToast();

  useEffect(() => {
    const repsonseIntercept = api.interceptors.response.use(
      (response) => response,
      (err) => {
        console.log("result", err?.response.status === 401);
        if (err?.response.status === 401) {
          displayToast(toast, "You are logged out. Log in to access the app.", "error");
          setLoggedIn(false);
          navigate("/login");
        }
        console.log(err.response);
      }
    );

    return () => {
      api.interceptors.response.eject(repsonseIntercept);
    };
  });

  return api;
}
