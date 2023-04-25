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

export default function ProfileForm(props) {
  const { isOpen, onClose, finalRef } = props;

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input placeholder="Full Name" type="text"/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>About</FormLabel>
              <Input placeholder="Short About" type="text"/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Image</FormLabel>
              <Input placeholder="Short About" type="file"/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme="whatsapp">Create Profile</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
