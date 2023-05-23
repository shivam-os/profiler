import { Button, HStack, Heading, Link, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { logoutUser } from "../api/authCalls";
import displayToast from "../utils/toastHelper";

export default function PublicHeader() {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  const home = loggedIn ? "/dashboard" : "/";

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      setLoggedIn(false)
      displayToast(toast, response.data.msg, "success");
      navigate("/login");
    } catch (err) {
      console.log(err);
      displayToast(toast, err.response.data.err);
    }
  }

  return (
    <HStack w="100%" justifyContent="space-between" p="1rem" mb="10rem">
      <Heading as={NavLink} to={`${home}`}>
        Profiler
      </Heading>
      <HStack>
        {loggedIn ? (
          <Button colorScheme="facebook" variant="outline" onClick={handleLogout}>Log out</Button>
        ) : (
          <Link as={NavLink} to="/" fontWeight="600">
            Home
          </Link>
        )}
      </HStack>
    </HStack>
  );
}
