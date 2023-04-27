import { VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "./context/userContext";
import { loadUser } from "./utils/storageHelper";
import AppRoutes from "./components/AppRoutes";
import { getAllProfiles, setToken } from "./api/profileCalls";

function App() {
  const { user, setUser, setProfiles, profiles } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = loadUser();

    if (loggedUser) {
      setUser(loggedUser);
      setToken(loggedUser.token);
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        const response = await getAllProfiles();
        setProfiles(response.data.userProfiles.profiles);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      fetchAllProfiles();
    }
  }, [user]);

  return (
    <div className="App">
      <VStack
        maxWidth={{ base: "100%", "2xl": "80%" }}
        justifyContent="space-between"
        h="100vh"
      >
        <AppRoutes />
      </VStack>
    </div>
  );
}

export default App;
