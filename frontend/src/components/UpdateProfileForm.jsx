import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
  Input,
  VStack,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import { newProfileSchema } from "../utils/profileValidator";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProfile, deleteLink, getSingleProfile, updateProfile } from "../api/profileCalls";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ToastContext from "../context/toastContext";

function Linkform(props) {
  const { register, control, errors, handleLinkDelete } = props;
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "sites",
  });

  return (
    <Box w="100%">
      <Text fontWeight="semibold" mb="1rem">
        Links:
      </Text>
      {fields.map((item, index) => (
        <Box key={item.id} w="100%">
          <FormControl
            isRequired
            isInvalid={errors.sites?.[index]?.siteName}
            mb="0.5rem"
          >
            <Input
              placeholder="Site Name"
              type="text"
              {...register(`sites.${index}.siteName`)}
              // defaultValue={item.siteName}
            />
            <FormErrorMessage>
              {errors.sites?.[index]?.siteName?.message.slice(9)}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.sites?.[index]?.siteUrl}>
            <Input
              placeholder="Site Link"
              type="text"
              {...register(`sites.${index}.siteUrl`)}
              defaultValue={item.siteUrl}
            />
            <FormErrorMessage>
              {errors.sites?.[index]?.siteUrl?.message.slice(9)}
            </FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => handleLinkDelete(item, remove, index)}
            my="1rem"
          >
            Delete
          </Button>
        </Box>
      ))}
      <Button
        variant="solid"
        colorScheme="facebook"
        onClick={() => append({ siteName: "", siteUrl: "" })}
      >
        Add Site
      </Button>
    </Box>
  );
}

export default function UpdateProfileForm(props) {
  const { setProfiles, profiles } = useContext(UserContext);
  const { showToast } = useContext(ToastContext);
  const [formValues, setFormValues] = useState({
    name: "",
    about: "",
    sites: [],
  });
  // const [name, setName] = useState("");
  // const [about, setAbout] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues
  } = useForm({
    resolver: yupResolver(newProfileSchema),
    defaultValues: async () => {
      const response = await getSingleProfile(params.id);
      console.log(response)
      const { name, about, links, _id } = response.data;
      return { name, about, sites: links, profileId: _id };
    },
  });

  const handleProfileSubmit = async (data) => {
    try {
      const response = await updateProfile(getValues("profileId"), data);
      console.log("data", data);
      showToast(response.data.msg, "success");
      setProfiles([...profiles, response.data.createdProfile]);
      // navigate("/dashboard");
    } catch (err) {
      console.log(err);
      showToast(err.response.data.err, "error");
    }
  };

   const handleLinkDelete = async (item, remove, index) => {
    try {
      if (item._id) {
        await deleteLink(item._id);
      }
      remove(index)
      showToast("Link deleted!", "success");
    } catch (err) {
      console.log(err);
      showToast(err.response.data.err, "error");
    }
   }

  return (
    <VStack w="80%" alignItems="stretch" h="100%">
      <Heading textAlign="center">Create New Profile</Heading>
      <form onSubmit={handleSubmit(handleProfileSubmit)} w="100%">
        <FormControl isRequired isInvalid={errors.name} mb="0.5rem">
          <FormLabel>Full Name</FormLabel>
          <Input placeholder="Full Name" type="text" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.about} mb="2rem">
          <FormLabel>About</FormLabel>
          <Input placeholder="Short About" type="text" {...register("about")} />
          <FormErrorMessage>{errors.about?.message}</FormErrorMessage>
        </FormControl>
        <Linkform register={register} control={control} errors={errors} handleLinkDelete={handleLinkDelete}/>
        <Center mt="5rem">
          <Button
            colorScheme="blue"
            variant="outline"
            mr={3}
            as={NavLink}
            to="/dashboard"
          >
            Cancel
          </Button>
          <Button variant="solid" type="submit" colorScheme="whatsapp">
            Create Profile
          </Button>
        </Center>
      </form>
    </VStack>
  );
}
