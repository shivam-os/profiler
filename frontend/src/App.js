import { Box } from "@chakra-ui/react";
import AppRoutes from "./components/AppRoutes";


function App() {
  return (
    <Box maxWidth={{ base: "100%", "2xl": "80%" }} m="auto">
      <AppRoutes />
    </Box>
  );
}

export default App;
