import {
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegisterSchema } from "../utils/userValidator";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authCalls";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegisterSchema),
  });

  const handleFormSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VStack spacing="2rem" p="3rem" boxShadow="lg" maxWidth="70%" m="auto">
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
          <Input placeholder="Password" {...register("password")} type="password"/>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="facebook" type="submit" w="100%" mt="1rem">
          Register
        </Button>
      </form>
    </VStack>
  );
}
