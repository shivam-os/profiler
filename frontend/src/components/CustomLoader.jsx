import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Spinner,
  VStack,
} from "@chakra-ui/react";

export default function CustomLoader() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} width="10%" isCentered>
        <ModalOverlay />
        <ModalContent width="4rem" height="4rem">
          <ModalBody as={VStack} justifyContent="center" alignItems="center">
            <Spinner
              thickness="2px"
              size="lg"
              emptyColor="gray.200"
              color="blue.500"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
