import { Box } from "@chakra-ui/react";
import AppRoutes from "./components/AppRoutes";
import { useEffect, useContext } from "react";
import { verifyUser } from "./api/authCalls";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/userContext";
import useAxios from "./useAxios";
import { getAllProfiles } from "./api/profileCalls";

function App() {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(UserContext);
  const api = useAxios();

  //Verify if the user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get("/profiles");
        // const response = await getAllProfiles();
        if (response?.status === 200) {
          setLoggedIn(true);
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err)
      }
    };
    checkUser();
  }, [setLoggedIn]);

  return (
    <Box maxWidth={{ base: "100%", "2xl": "80%" }} m="auto">
      <AppRoutes />
    </Box>
  );
}

export default App;
