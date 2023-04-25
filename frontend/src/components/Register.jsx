import {
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegisterSchema } from "../utils/userValidator";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authCalls";

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegisterSchema),
  });

  const showToast = (msg, status) => {
    toast({
      description: msg,
      status: status,
      duration: 9000,
      isClosable: true,
    });
  };

  const handleFormSubmit = async (data) => {
    try {
      //Get the status code from the response
      const status = await registerUser(data);
      switch (status) {
        case 201:
          showToast(
            "User registered successfully! Login to access the dashboard.",
            "success"
          );
          navigate("/login");
          break;
        case 403:
          showToast(
            "User with given email already exists. Try login!",
            "error"
          );
          break;
        case 500:
          showToast(
            "Something has went wrong. Please try again later!",
            "error"
          );
          break;
        default:
          showToast("Login failed!", "error");
      }
    } catch (err) {
      console.log(err);
      showToast("Login failed!", "error");
    }
  };

  return (
    <VStack spacing="2rem" p="3rem" boxShadow="lg" maxWidth="70%">
      <Heading>Register</Heading>
      <Text>
        Already registered?{" "}
        <Text as={NavLink} to="/login" color="blue.600">
          <u>Login</u>
        </Text>
      </Text>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormControl isRequired className="form-items" isInvalid={errors.name}>
          <FormLabel>Full Name</FormLabel>
          <Input placeholder="Full name" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired className="form-items" isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          className="form-items"
          isInvalid={errors.password}
        >
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="facebook" type="submit" w="100%" mt="1rem">
          Register
        </Button>
      </form>
    </VStack>
  );
}
