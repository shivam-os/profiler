const User = require("../models/user");
const Profile = require("../models/profile");
const Link = require("../models/link");
const handleErrors = require("../utils/validators/handleErrors");

//GET method to get all profiles created by the user
exports.getAllProfiles = async (req, res) => {
  try {
    const userProfiles = await User.findById(req.user._id)
      .select({
        profiles: 1,
        _id: 0,
      })
      .populate({
        path: "profiles",
        populate: { path: "links" },
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
    const existingProfile = Profile.findById(req.params.id);

    //If profile with given id does not exists
    if (!existingProfile) {
      return res.status(404).json({
        err: "Profile with given id does not exist. Recheck the id and try again!",
      });
    }

    return res.status(200).json(await existingProfile.populate("links"));
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
    const { name, about, sites } = req.body;

    //Create the profile
    const createdProfile = await Profile.create({ name, about });

    //Save the created profile id to User
    req.user.profiles.push(createdProfile);
    req.user.save();

    //Create the links
    for (let i = 0; i < sites.length; i++) {

      const createdLink = await Link.create({
        siteName: sites[i].siteName,
        siteUrl: sites[i].siteUrl,
      });

      //Save the link in the profile
      createdProfile.links.push(createdLink);
    }
    createdProfile.save();

    return res
      .status(201)
      .json({ msg: "Profile created successfully!", createdProfile });
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
    const { name, about, sites } = req.body;

    const existingProfile = await Profile.findById(req.params.id);

    //If profile with given id does not exists
    if (!existingProfile) {
      return res.status(404).json({
        err: "Profile with given id does not exist. Recheck the id and try again!",
      });
    }

    //Update the profile
    await existingProfile.updateOne({ name, about });

    //Handle links
    for (let i = 0; i < sites.length; i++) {

      //If link has id, then find it and update the data
      if (sites[i]._id) {
        await Link.findByIdAndUpdate(sites[i]._id, {
          siteName: sites[i].siteName,
          siteUrl: sites[i].siteUrl,
        });
      } else {
        //If link does not has the id, then create new link
        const newLink = await Link.create({
          siteName: sites[i].siteName,
          siteUrl: sites[i].siteUrl,
        });
        existingProfile.links.push(newLink);
      }
    }

    existingProfile.save()

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
    const existingProfile = await Profile.findById(req.params.id);

    //If profile with given id does not exists
    if (!existingProfile) {
      return res.status(404).json({
        err: "Profile with given id does not exist. Recheck the id and try again!",
      });
    }

    const { links } = existingProfile;

    for (let i = 0; i < links.length; i++) {
      //Find and delete the link with given id
      const existingLink = await Link.findOneAndDelete(links[i]._id);
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

//DELETE method to delete a link with given id
exports.deleteProfileLink = async (req, res) => {
  try {
    const deletedLink = await Link.findByIdAndDelete(req.params.id);

    //If link not found
    if (!deletedLink) {
      return res.status(400).json({
        err: "Link with given id not found. Recheck the id and try again!",
      });
    }

    return res.status(200).json({ msg: "Link deleted successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};
