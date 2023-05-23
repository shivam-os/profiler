const displayToast = (toast, msg, status) => {
  toast({
    description: msg,
    status: status,
    duration: 5000,
    isClosable: true,
  });
};

export default displayToast;
