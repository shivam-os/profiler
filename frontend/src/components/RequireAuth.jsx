import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext";

export default function RequireAuth() {
  const { user } = useContext(UserContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
}
