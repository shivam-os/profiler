import { useContext, useEffect } from "react";
import api from "../api/serverData";
import { useToast } from "@chakra-ui/react";
import displayToast from "../utils/toastHelper";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import LoadingContext from "../context/loadingContext";

export default function AxiosInterceptor({ children }) {
  const toast = useToast();
  const { setLoggedIn } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        setIsLoading(true);
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        setIsLoading(false);
        if (response?.data?.msg) {
          displayToast(toast, response?.data.msg, "success");
        }
        return response;
      },

      (error) => {
        setIsLoading(false);
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
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [setLoggedIn, toast, setIsLoading]);

  return children;
}
