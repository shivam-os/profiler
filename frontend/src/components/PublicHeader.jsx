import { Button, HStack, Heading, Link } from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { deleteUser } from "../utils/storageHelper";

export default function PublicHeader() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <HStack w="100%" justifyContent="space-between" p="1rem">
      <Heading as={NavLink} to="/">
        Profiler
      </Heading>
      <HStack>
        {user ? (
          <Button colorScheme="facebook" variant="outline" onClick={() => {
            deleteUser()
            navigate("/login")
          }}>Log out</Button>
        ) : (
          <Link as={NavLink} to="/" fontWeight="600">
            Home
          </Link>
        )}
      </HStack>
    </HStack>
  );
}
