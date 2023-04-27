import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import PublicLayout from "./PublicLayout";
import DashboardLayout from "./DashboardLayout";
import Dashboard from "./Dashboard";
import RequireAuth from "./RequireAuth";
import ProfileForm from "./ProfileForm";
import UpdateProfileForm from "./UpdateProfileForm";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="profile/new" element={<ProfileForm />} />
          <Route path="profile/:id" element={<UpdateProfileForm />} />
        </Route>
      </Route>
    </Routes>
  );
}
