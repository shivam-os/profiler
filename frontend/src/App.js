import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "./context/userContext";
import { loadUser } from "./utils/storageHelper";
import AppRoutes from "./components/AppRoutes";
import { getAllProfiles, setToken } from "./api/profileCalls";
import { ProfileContext } from "./context/profileContext";
import useAxios from "./useAxios";

function App() {
  const { user, setUser } = useContext(UserContext);
  // const {profiles, setProfiles} = useContext(ProfileContext);
  const navigate = useNavigate();
  const api = useAxios();

  //If item exists in localStorage & token is valid, send to dashboard
  // useEffect(() => {
  //   const loggedUser = loadUser();

  //   if (loggedUser) {
  //     setUser(loggedUser);
  //     setToken(loggedUser.token);
  //     navigate("/dashboard");
  //   }
  // }, []);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        const response = await api.get("/profiles")
        // setProfiles(response.data.userProfiles.profiles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProfiles()
  }, []);

  return (
      <Box
        maxWidth={{ base: "100%", "2xl": "80%" }} m="auto"
      >
        <AppRoutes />
      </Box>
  );
}

export default App;
