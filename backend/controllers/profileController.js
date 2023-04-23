const User = require("../models/user");
const Profile = require("../models/profile");
const handleErrors = require("../utils/validators/handleErrors");

const ifProfileExists = async (id) => {
  try {
    const existingProfile = await Profile.findById(id);
    if (existingProfile) {
      return existingProfile;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

//GET method to get all profiles created by the user
exports.getAllProfiles = async (req, res) => {
  try {
    const userProfiles = await User.findById(req.user._id).select({
      profiles: 1,
      _id: 0,
    });

    //If no profiles found
    if (userProfiles.profiles.length === 0) {
      return res
        .status(404)
        .json({ err: "No profiles found. Create one and try again!" });
    }

    return res.status(200).json({ userProfiles });
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
    const existingProfile = await ifProfileExists(req.params.id);

    //If profile with given id does not exists
    if (!existingProfile) {
      return res.status(404).json({
        err: "Profile with given id does not exist. Recheck the id and try again!",
      });
    }

    return res.status(200).json(existingProfile);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};

//POST method to create a new profile
exports.createProfile = async (req, res) => {
  //Handle errors coming from the create profile validator
  handleErrors(req, res);

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
  //Handle errors coming from the create profile validator
  handleErrors(req, res);
  try {
    const { name, image } = req.body;

    //If profile with given id does not exists
    if (!(await existingProfile(req.params.id))) {
      return res.status(404).json({
        err: "Profile with given id does not exist. Recheck the id and try again!",
      });
    }

    //Update the profile
    await Profile.findByIdAndUpdate(req.params.id, { name, image });

    return res.status(200).json({ msg: "Profile updated successfully!" });
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
    //If profile with given id does not exists
    if (!(await existingProfile(req.params.id))) {
      return res.status(404).json({
        err: "Profile with given id does not exist. Recheck the id and try again!",
      });
    }

    //Delete the profile
    await Profile.findByIdAndDelete(req.params.id);

    return res.status(200).json({ msg: "Profile deleted successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};
