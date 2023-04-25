import {
  VStack,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  Menu,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon, SettingsIcon, CopyIcon } from "@chakra-ui/icons";
import { useContext, useRef } from "react";
import UserContext from "../context/userContext";
import ProfileForm from "./ProfileForm";
import LinkForm from "./LinkForm";

function CustomMenuButton() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<SettingsIcon />}
        variant="outline"
      >
        Open menu
      </MenuButton>
      <MenuList>
        <MenuItem as="a" href="#">
          Edit Profile
        </MenuItem>
        <MenuItem as="a" href="#">
          Delete Profile
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
function ProfileLink() {
  return (
    <HStack justifyContent="space-between" mb="1rem">
      <Box>
        <Heading>Github</Heading>
        <Text>https://github.com</Text>
      </Box>
      <IconButton icon={<CopyIcon />} aria-label="Copy the link" />
    </HStack>
  );
}

function ProfileCard(props) {
  const { isOpen: isLinkOpen, onOpen: onLinkOpen, onClose: onLinkClose } = useDisclosure();
  return (
    <Card w="100%">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
              <Text>Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <CustomMenuButton />
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody>
        <ProfileLink />
        <ProfileLink />
        <ProfileLink />
      </CardBody>
      <CardFooter>
        <Button leftIcon={<AddIcon />} size="lg" colorScheme="facebook" onClick={onLinkOpen}>
          Add Link
        </Button>
        <LinkForm isLinkOpen={isLinkOpen} onLinkOpen={onLinkClose} onLinkClose={onLinkClose}/>
      </CardFooter>
    </Card>
  );
}

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);


  return (
    <VStack w="90%" spacing="2rem">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="text"
          placeholder="Search profile name or link"
          size="lg"
        />
      </InputGroup>
      <Button
        leftIcon={<AddIcon />}
        w="100%"
        size="lg"
        colorScheme="facebook"
        onClick={onOpen}
      >
        Add New Profile
      </Button>
      <ProfileForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} finalRef={finalRef}/>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </VStack>
  );
}
