import PublicHeader from "./PublicHeader";
import Footer from "../components/Footer";
import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import useAxios from "../useAxios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { ProfileContext } from "../context/profileContext";

export default function DashboardLayout() {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { profiles, setProfiles } = useContext(ProfileContext);
  const navigate = useNavigate();
  const api = useAxios();

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        const response = await api.get("/profiles");
        const userProfiles = await response.data.userProfiles.profiles
        if (response?.status === 200) {
          console.log("status", response?.status === 200)
          setLoggedIn(true)
          console.log(loggedIn)
          navigate("/dashboard")
          setProfiles(userProfiles);
          console.log(profiles)
        }        
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProfiles();
    
  }, [loggedIn]);

  return (
    <VStack w="100%" h="100%" gap="3rem" justifyContent="space-between">
      <PublicHeader />
      <Outlet />
      <Footer />
    </VStack>
  );
}
