const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userValidator = require("../utils/validators/userValidator");
const passport = require("passport");

//POST request to register a new user
router.post("/register", userValidator.register, userController.register);

//POST request to login an existing user
router.post("/login", userValidator.login, userController.login);

//POST request to logout a logged in user
router.post("/logout", userController.logout);

//GET request to verify a user
router.get("/verify", passport.authenticate("jwt", { session: false }), userController.verify)

module.exports = router;
