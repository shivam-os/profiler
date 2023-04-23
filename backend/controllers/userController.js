//POST method to register a new user
exports.register = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};

//POST method to login a new user
exports.login = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};
