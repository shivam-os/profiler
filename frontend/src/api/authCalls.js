import api from "./serverData";

//Make register request to the server
export const registerUser = async (userData) =>
  await api.post("/users/register", userData);

//Make login request to the server
export const loginUser = async (userData) =>
  await api.post("/users/login", userData);

//Verify is user is logged in
export const verifyUser = async () => await api.get("/users/verify");

//Logout the existing user
export const logoutUser = async () => await api.post("/users/logout");
