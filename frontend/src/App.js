import { VStack } from "@chakra-ui/react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import PublicLayout from "./components/PublicLayout";
import UserContext from "./context/userContext";
import DashboardHeader from "./components/DashboardHeader";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import { loadUser } from "./utils/storageHelper";
import RequireAuth from "./components/RequireAuth";

function App() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = loadUser();

    if (loggedUser) {
      setUser(loggedUser);
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="App">
      <VStack
        maxWidth={{ base: "100%", "2xl": "80%" }}
        justifyContent="space-between"
        h="100vh"
      >
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
            </Route>
          </Route>
        </Routes>
      </VStack>
    </div>
  );
}

export default App;
