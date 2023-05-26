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
import { createProfile } from "../api/profileCalls";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ProfileContext } from "../context/profileContext";

//Component for adding links
function Linkform(props) {
  const { register, control, errors } = props;
  const { fields, append, remove } = useFieldArray({
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
              defaultValue={item.siteName}
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
            onClick={() => remove(index)}
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

export default function ProfileForm() {
  const { setProfiles, profiles } = useContext(ProfileContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newProfileSchema) });

  const handleProfileSubmit = async (data) => {
    try {
      const response = await createProfile(data);
      setProfiles([response.data.createdProfile, ...profiles]);
      console.log("hel");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

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
        <Linkform register={register} control={control} errors={errors} />
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
