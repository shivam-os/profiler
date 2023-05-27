import { Box } from "@chakra-ui/react";
import AppRoutes from "./components/AppRoutes";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/userContext";
import { verifyUser } from "./api/authCalls";
import LoadingContext from "./context/loadingContext";
import CustomLoader from "./components/CustomLoader";

function App() {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(UserContext);
  const { isLoading } = useContext(LoadingContext);

  //Verify if the user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await verifyUser();
        if (response?.status === 200) {
          setLoggedIn(true);
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkUser();
  }, [setLoggedIn]);

  return (
    <Box maxWidth={{ base: "100%", "2xl": "80%" }} m="auto">
      {isLoading ? <CustomLoader /> : null}
      <AppRoutes />
    </Box>
  );
}

export default App;
