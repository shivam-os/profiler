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
import { userLoginSchema } from "../utils/userValidator";
import { useToast } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authCalls";
import UserContext from "../context/userContext";
import { saveUser } from "../utils/storageHelper";

export default function Login() {
  const toast = useToast();
  const {setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userLoginSchema) });

  const showToast = (msg, status) => {
    toast({
      description: msg,
      status: status,
      duration: 9000,
      isClosable: true,
    });
  };

  const handleLoginSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      console.log("data", response);
      switch (response.status) {
        case 200:
          showToast(response.data.msg, "success");
          const userData = {
            token: response.data.token,
            name: response.data.name,
          };
          setUser(userData);
          saveUser(userData);
          navigate("/dashboard");
          break;
        case 404:
          showToast(response.data.err, "error");
          break;
        case 500:
          showToast(response.data.err, "error");
          break;
        default:
          showToast("Login failed!", "error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VStack spacing="2rem" p="3rem" boxShadow="lg">
      <Heading>Login</Heading>
      <Text>
        New here?{" "}
        <Text as={NavLink} to="/register" color="blue.600">
          <u>Register</u>
        </Text>
      </Text>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <FormControl isRequired className="form-items" isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" {...register("email")} type="email" />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          className="form-items"
          isInvalid={errors.password}
        >
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            {...register("password")}
            type="password"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="facebook" type="submit" w="100%" mt="1rem">
          Login
        </Button>
      </form>
    </VStack>
  );
}
