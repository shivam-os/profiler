import { useContext, useEffect } from "react";
import api from "../api/serverData";
import { useToast } from "@chakra-ui/react";
import displayToast from "../utils/toastHelper";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function AxiosInterceptor({ children }) {
  const toast = useToast();
  const { setLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = (response) => {
      if (response?.data?.msg) {
        displayToast(toast, response?.data.msg, "success");
      }
      console.log("ran");
      return response;
    };

    const errorInterceptor = (error) => {
      const err = error.response;
      if (err?.status === 401) {
        displayToast(
          toast,
          "You are logged out. Log in to access the app.",
          "error"
        );
        setLoggedIn(false);
        navigate("/login");
      } else {
        displayToast(toast, err?.data?.err, "error");
      }
      console.log("useAxios");
      return Promise.reject(error);
    };

    const interceptor = api.interceptors.response.use(responseInterceptor, errorInterceptor);

    return () => api.interceptors.response.eject(interceptor)
  }, [setLoggedIn, toast]);

  return children;
}
