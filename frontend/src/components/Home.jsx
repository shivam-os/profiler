import {
  VStack,
  Button,
  Heading,
  Text,
  ListItem,
  ListIcon,
  List,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <VStack px="5" w="100%" spacing="5">
      <Text fontWeight="600" fontSize="2xl">
        Track your favorite online profiles with
      </Text>
      <Heading
        bgGradient="linear(to-l, #4dab3b, #faaf00)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="800"
      >
        Profiler
      </Heading>
      <Text textAlign="center" pb="10">
        Tired of keeping tracks of your favorite online personalities? Use the
        profiler and add as many profiles with as many links as you want!
      </Text>
      <Button
        as={NavLink}
        to="/register"
        variant="outline"
        colorScheme="facebook"
        size="lg"
      >
        Register
      </Button>
      <Button
        as={NavLink}
        to="/login"
        variant="solid"
        colorScheme="facebook"
        size="lg"
      >
        Login
      </Button>
      <VStack pt="20">
        <Heading fontWeight="600" fontSize="2xl">
          Perform all operations like:{" "}
        </Heading>
      </VStack>
      <List spacing="5">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Create new profiles
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          View previously created profiles
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Update as you want
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Delete unwanted records
        </ListItem>
      </List>
    </VStack>
  );
}
