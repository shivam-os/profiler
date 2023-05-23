import { publicAxios } from "./serverData";

//Make register request to the server
export const registerUser = async (userData) => {
  const response = await publicAxios.post("/users/register", userData);
  return response;
};

//Make login request to the server
export const loginUser = async (userData) => {
  const response = await publicAxios.post("/users/login", userData);
  return response;
};

//Verify is user is logged in
export const verifyUser = async () => {
  const response = await publicAxios.get("/users/verify");
  return response
}

//Logout the existing user
export const logoutUser = async () => {
  const response = await publicAxios.post("/users/logout");
  return response;
};
