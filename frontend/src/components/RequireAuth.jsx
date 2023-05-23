import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext";

export default function RequireAuth() {
  const { loggedIn } = useContext(UserContext);
  
  return loggedIn === true ? <Outlet /> : <Navigate to="/login" />;
}
