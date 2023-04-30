import {Center, Link} from "@chakra-ui/react";

export default function Footer() {
  return <Center bgColor="gray.100" w="100%" color="gray.700" p="1.5rem" mt="10rem">
    Made with ❤️ by<Link href="https://github.com/shivam-os" textDecoration="underline"><span style={{marginLeft: "5px"}}>Shivam</span></Link>
  </Center>;
}
