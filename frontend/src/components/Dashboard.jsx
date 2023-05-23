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
  Box,
  Heading,
  Text,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  Menu,
  Divider,
  useToast,
} from "@chakra-ui/react";
import {
  SearchIcon,
  AddIcon,
  SettingsIcon,
  CopyIcon,
  CalendarIcon,
} from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { deleteProfile } from "../api/profileCalls";
import { NavLink, useNavigate } from "react-router-dom";
import { ProfileContext } from "../context/profileContext";
import displayToast from "../utils/toastHelper";

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
  const { siteName, siteUrl, copyLink } = props;

  return (
    <HStack justifyContent="space-between" mb="1rem">
      <Box>
        <Text fontSize="xl" fontWeight="medium">
          {siteName}
        </Text>
        <Text>{siteUrl}</Text>
      </Box>
      <IconButton
        icon={<CopyIcon />}
        aria-label="Copy the link"
        onClick={() => copyLink(siteUrl)}
      />
    </HStack>
  );
}

function ProfileCard(props) {
  const { name, about, links, id } = props;
  const toast = useToast();
  const { setProfiles, profiles } = useContext(ProfileContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await deleteProfile(id);
      displayToast(toast, response.data.msg, "success");
      setProfiles(profiles.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
      displayToast(toast, err.response.data.err, "error");
    }
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    displayToast(toast, "Link copied!", "success");
  };

  return (
    <Card w="100%">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
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
              copyLink={copyLink}
            />
          );
        })}
      </CardBody>
    </Card>
  );
}

function ProfileList(props) {
  const { profiles } = useContext(ProfileContext);
  const { searchResults } = props;

  return (
    <>
      {searchResults === [] ? profiles : searchResults.map((item) => {
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
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { profiles } = useContext(ProfileContext);

  const handleSearchBox = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log(search);
    setSearchResults(
      profiles.filter((item) =>
        item.name.toLowerCase().includes(search.trim().toLowerCase())
      )
    );
  }, [search, profiles]);

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
          value={search}
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
      <ProfileList searchResults={searchResults} />
    </VStack>
  );
}
