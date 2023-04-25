const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const profileValidator = require("../utils/validators/profileValidator");
const linkValidator = require("../utils/validators/linkValidator");
const passport = require("passport");

//GET request to get all profiles created by a user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getAllProfiles
);

//POST request to create a new profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileValidator.createProfile,
  profileController.createProfile
);

//GET request to get single profile with given id
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  profileController.getSingleProfile
);

//PUT request to update profile with existing id
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  profileValidator.createProfile,
  profileController.updateProfile
);

//DELETE request to delete profile with existing id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteProfile
);

//POST request to create new url for profile with given id
router.post(
  "/:id/links",
  passport.authenticate("jwt", { session: false }),
  linkValidator.createLink,
  profileController.createProfileLink
);

//PUT request to update the existing link
router.put(
  "/links/:linkId",
  passport.authenticate("jwt", { session: false }),
  linkValidator.createLink,
  profileController.updateProfileLink
);

//DELETE request to update the existing link
router.delete(
  "/links/:linkId",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteProfileLink
);

module.exports = router;
