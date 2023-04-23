const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

//GET request to get all profiles created by a user
router.get("/", profileController.getAllProfiles);

//POST request to create a new profile
router.post("/", profileController.createProfile);

//GET request to get single profile with given id
router.get("/:id", profileController.getSingleProfile)

//PUT request to update profile with existing id
router.put("/:id", profileController.updateProfile);

//DELETE request to delete profile with existing id
router.delete("/:id", profileController.deleteProfile)

module.exports = router;
