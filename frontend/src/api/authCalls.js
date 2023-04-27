import api from "./serverData";

//Make register request to the server
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.status
  } catch (err) {
    return err.response.status
  }
};

//Make login request to the server
export const loginUser = async (userData) => {
  const response = await api.post("/users/login", userData);
  return response
  // try {
  //   const response = await api.post("/users/login", userData);
  //   return response;
  // } catch (err) {
  //   console.log(err);
  //   return err.response;
  // }
};
