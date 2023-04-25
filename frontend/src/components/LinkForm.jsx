import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Box,
  Input,
} from "@chakra-ui/react";

export default function LinkForm(props) {
  const { isLinkOpen, onLinkClose } = props;

  return (
    <>
      <Modal isOpen={isLinkOpen} onClose={onLinkClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Site Name</FormLabel>
              <Input placeholder="Site Name" type="text"/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Site Link</FormLabel>
              <Input placeholder="Site Link" type="text"/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" variant="outline" mr={3} onClick={onLinkClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme="whatsapp">Create Profile</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
