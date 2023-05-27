import { Button, HStack, Heading, Link } from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { logoutUser } from "../api/authCalls";

export default function PublicHeader() {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const home = loggedIn ? "/dashboard" : "/";

  const handleLogout = async () => {
    try {
      await logoutUser();
      setLoggedIn(false)
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <HStack w="100%" justifyContent="space-between" p="1rem" mb="1rem">
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
