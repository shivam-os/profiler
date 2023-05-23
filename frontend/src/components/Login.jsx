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
import { userLoginSchema } from "../utils/userValidator";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authCalls";
import UserContext from "../context/userContext";
import displayToast from "../utils/toastHelper";

export default function Login() {
  const { setLoggedIn } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userLoginSchema) });

  const handleLoginSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      displayToast(toast, response.data.msg, "success");
      setLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      displayToast(toast, err.response.data.err, "error");
    }
  };

  return (
    <VStack spacing="2rem" p="3rem" boxShadow="lg" maxWidth="70%" m="auto">
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
