import { HStack, Heading, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function PublicHeader() {
  return (
    <HStack w="100%" justifyContent="space-between" p="1rem">
      <Heading as={NavLink} to="/">
        Profiler
      </Heading>
      <HStack>
        <Link as={NavLink} to="/" fontWeight="600">
          Home
        </Link>
      </HStack>
    </HStack>
  );
}
