import PublicHeader from "./PublicHeader";
import Footer from "../components/Footer";
import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <VStack w="100%" h="100%" gap="3rem" justifyContent="space-between">
      <PublicHeader />
      <Outlet />
      <Footer />
    </VStack>
  );
}
