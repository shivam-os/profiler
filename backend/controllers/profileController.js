//GET method to get all profiles created by the user
exports.getAllProfiles = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};

//GET method to get single profile created by the user
exports.getSingleProfile = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};

//POST method to create a new profile
exports.createProfile = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};

//PUT method to update a profile with given id
exports.updateProfile = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};

//DELETE method to delete a profile with given id
exports.deleteProfile = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};
