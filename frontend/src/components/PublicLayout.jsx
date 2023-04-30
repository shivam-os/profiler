import PublicHeader from "./PublicHeader";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <Box>
      <PublicHeader />
      <Outlet />
      <Footer />
    </Box>
  );
}
