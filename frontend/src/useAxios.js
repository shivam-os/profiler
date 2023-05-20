import { useContext, useEffect } from "react";
import api from "./api/serverData";
import { useNavigate } from "react-router-dom";
import ToastContext from "./context/toastContext";

export default function useAxios() {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err?.response.status) {
          showToast(
            "You are logged out. Log in to access the app.",
            "error"
          );
          navigate("/login");
        }
        console.log(err.response);
      }
    );
  }, []);

  return api;
}
