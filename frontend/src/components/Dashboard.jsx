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
} from "@chakra-ui/react";
import {
  SearchIcon,
  AddIcon,
  SettingsIcon,
  CopyIcon,
  CalendarIcon,
} from "@chakra-ui/icons";
import { useContext, useState } from "react";
import UserContext from "../context/userContext";
import { deleteProfile } from "../api/profileCalls";
import ToastContext from "../context/toastContext";
import { NavLink, useNavigate } from "react-router-dom";

function CustomMenuButton(props) {
  const { handleDelete, handleEdit } = props;
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
        <MenuItem onClick={handleEdit}>Edit Profile</MenuItem>
        <MenuItem onClick={handleDelete}>Delete Profile</MenuItem>
      </MenuList>
    </Menu>
  );
}
function ProfileLink(props) {
  const { siteName, siteUrl } = props;

  return (
    <HStack justifyContent="space-between" mb="1rem">
      <Box>
        <Text fontSize="xl" fontWeight="medium">
          {siteName}
        </Text>
        <Text>{siteUrl}</Text>
      </Box>
      <IconButton icon={<CopyIcon />} aria-label="Copy the link" />
    </HStack>
  );
}

function ProfileCard(props) {
  const { name, about, links, id } = props;
  const { showToast } = useContext(ToastContext);
  const { setProfiles, profiles } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await deleteProfile(id);
      showToast(response.data.msg, "success");
      setProfiles(profiles.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
      showToast(err.response.data.err, "error");
    }
  };

  return (
    <Card w="100%">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            {/* <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" /> */}
            <CalendarIcon />
            <Box>
              <Heading size="sm">{name}</Heading>
              <Text>{about}</Text>
            </Box>
          </Flex>
          <CustomMenuButton
            handleDelete={() => handleDelete(id)}
            handleEdit={() => navigate(`/dashboard/profile/${id}`)}
          />
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody>
        {links.map((item) => {
          return (
            <ProfileLink
              key={item._id}
              siteName={item.siteName}
              siteUrl={item.siteUrl}
            />
          );
        })}
      </CardBody>
    </Card>
  );
}

function ProfileList() {
  const { profiles } = useContext(UserContext);

  console.log("profiles", profiles);
  return (
    <>
      {profiles?.map((item) => {
        return (
          <ProfileCard
            key={item._id}
            name={item.name}
            about={item.about}
            links={item.links}
            id={item._id}
          />
        );
      })}
    </>
  );
}

export default function Dashboard() {
  const { searchBoxValue, setSearchBoxValue } = useState("");
  const { searchedProfiles, setSearchedProfiles } = useState();

  const handleSearchBox = (e) => {
    setSearchBoxValue(e.target.value);
  };

  return (
    <VStack w="90%" spacing="2rem">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="text"
          placeholder="Search profile name"
          size="lg"
          value={searchBoxValue}
          onChange={(e) => handleSearchBox(e)}
        />
      </InputGroup>
      <Button
        leftIcon={<AddIcon />}
        w="100%"
        size="lg"
        colorScheme="facebook"
        as={NavLink}
        to="/dashboard/profile/new"
      >
        Add New Profile
      </Button>
      <ProfileList />
    </VStack>
  );
}
