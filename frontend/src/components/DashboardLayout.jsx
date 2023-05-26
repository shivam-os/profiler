import PublicHeader from "./PublicHeader";
import Footer from "../components/Footer";
import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import useAxios from "../useAxios";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../context/profileContext";
import { getAllProfiles } from "../api/profileCalls";

export default function DashboardLayout() {
  const { setProfiles } = useContext(ProfileContext);
  const api = useAxios();

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        console.log("fetchprofilie")
        const response = await getAllProfiles()
        const userProfiles = await response.data.userProfiles.profiles;
        setProfiles(userProfiles);
      } catch (err) {
        console.log(err);
      }
    };
    // if (loggedIn) {
    //   fetchAllProfiles();
    // }
    fetchAllProfiles()
  }, [api, setProfiles]);

  return (
    <VStack w="100%" h="100%" gap="3rem" justifyContent="space-between">
      <PublicHeader />
      <Outlet />
      <Footer />
    </VStack>
  );
}
