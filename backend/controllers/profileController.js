const User = require("../models/user");
const Profile = require("../models/profile");
const Link = require("../models/link");
const httpResponses = require("../utils/httpResponses");
const responseObj = "Profile";

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
    return httpResponses.serverError(res);
  }
};

//GET method to get single profile created by the user
exports.getSingleProfile = async (req, res) => {
  try {
    const existingProfile = Profile.findById(req.params.id);

    //If profile with given id does not exists
    if (!existingProfile) {
      return httpResponses.notFoundError(res, responseObj);
    }

    return res.status(200).json(await existingProfile.populate("links"));
  } catch (err) {
    console.log(err);
    return httpResponses.serverError(res);
  }
};

//POST method to create a new profile
exports.createProfile = async (req, res) => {
  //Handle errors coming from the create profile validator
  if (httpResponses.validationError(req, res)) {
    return;
  }
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

    return res.json({
      createdProfile,
      msg: "Profile created successfully!",
    });
  } catch (err) {
    console.log(err);
    return httpResponses.serverError(res);
  }
};

//PUT method to update a profile with given id
exports.updateProfile = async (req, res) => {
  //Handle errors coming from the create profile validator
  if (httpResponses.validationError(req, res)) {
    return;
  }
  try {
    const { name, about, sites } = req.body;

    const existingProfile = await Profile.findById(req.params.id);

    //If profile with given id does not exists
    if (!existingProfile) {
      return httpResponses.notFoundError(res, responseObj);
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

    existingProfile.save();

    return res.json({
      createdProfile: await existingProfile.populate("links"),
      msg: "Profile updated successfully!",
    });
  } catch (err) {
    console.log(err);
    return httpResponses.serverError(res);
  }
};

//DELETE method to delete a profile with given id
exports.deleteProfile = async (req, res) => {
  try {
    const existingProfile = await Profile.findById(req.params.id);

    //If profile with given id does not exists
    if (!existingProfile) {
      return httpResponses.notFoundError(res, responseObj);
    }

    const { links } = existingProfile;

    for (let i = 0; i < links.length; i++) {
      //Find and delete the link with given id
      await Link.findOneAndDelete(links[i]._id);
    }

    //Delete the profile
    await Profile.findByIdAndDelete(req.params.id);

    return httpResponses.deletedResponse(res, responseObj);
  } catch (err) {
    console.log(err);
    return httpResponses.serverError(res);
  }
};

//DELETE method to delete a link with given id
exports.deleteProfileLink = async (req, res) => {
  try {
    const deletedLink = await Link.findByIdAndDelete(req.params.id);

    //If link not found
    if (!deletedLink) {
      return httpResponses.notFoundError(res, "Link");
    }

    return httpResponses.deletedResponse(res, "Link");
  } catch (err) {
    console.log(err);
    return httpResponses.serverError(res);
  }
};
