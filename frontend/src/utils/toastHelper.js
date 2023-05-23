const displayToast = (toast, msg, status) => {
  toast({
    description: msg,
    status: status,
    duration: 9000,
    isClosable: true,
  });
};

export default displayToast;
