import { useContext, useEffect } from "react";
import api from "./api/serverData";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/userContext";
import { useToast } from "@chakra-ui/react";
import displayToast from "./utils/toastHelper";
import { useCallback } from "react";

// export default function useAxios() {
//   const navigate = useNavigate();
//   const { setLoggedIn } = useContext(UserContext);
//   const toast = useToast();

//   const createApiInstance = () => {
//     const instance = api.create(); // Create a new instance of the API
//     return instance;
//   };

//   // api.interceptors.response.use(
//   //   (response) => response,

//   //   (err) => {
//   //     if (err?.response.status === 401) {
//   //       displayToast(
//   //         toast,
//   //         "You are logged out. Log in to access the app.",
//   //         "error"
//   //       );
//   //       // setLoggedIn(false);
//   //       // navigate("/login");
//   //     } else {
//   //       displayToast(toast, err?.response?.data.err, "error");
//   //     }
//   //     console.log("interceptor")
//   //   }

//   // );

//   const responseInterceptor = (response) => {
//     console.log("ran");
//     return response;
//   };

//   useEffect(() => {
//     const instance = createApiInstance(); // Create a new instance of the API

//     const errorInterceptor = (err) => {
//       if (err?.response?.status === 401) {
//         displayToast(
//           toast,
//           "You are logged out. Log in to access the app.",
//           "error"
//         );
//         setLoggedIn(false);
//       } else {
//         displayToast(toast, err?.response?.data.err, "error");
//       }
//       console.log("useAxios");
//       return Promise.reject(err);
//     };

//     const responseInterceptorId = instance.interceptors.response.use(
//       responseInterceptor,
//       errorInterceptor
//     );

//     return () => {
//       instance.interceptors.response.eject(responseInterceptorId);
//     };
//   }, [responseInterceptor, setLoggedIn, toast]);

//   return api;
// }

const createApiInstance = () => {
  const instance = api.create();
  return instance;
};

export default function useAxios() {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(UserContext);
  const toast = useToast();

  const handleResponse = useCallback(
    (response) => {
      if (response?.data?.msg) {
        displayToast(toast, response?.data.msg, "success");
      }
      console.log("ran");
      return response;
    },
    [toast]
  );

  

  useEffect(() => {
    const instance = createApiInstance();

    const handleError =
    (error) => {
      const err = error.response;
      if (err?.status === 401) {
        displayToast(
          toast,
          "You are logged out. Log in to access the app.",
          "error"
        );
        setLoggedIn(false);
        navigate("/login")
      } else {
        displayToast(toast, err?.data?.err, "error");
      }
      console.log("useAxios");
      return Promise.reject(error);
    }

    const responseInterceptorId = instance.interceptors.response.use(
      handleResponse,
      handleError
    );

    return () => {
      instance.interceptors.response.eject(responseInterceptorId);
    };
  }, [handleResponse, setLoggedIn, toast]);

  return api;
}
