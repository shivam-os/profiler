const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userValidator = require("../utils/validators/userValidator");

//POST request to register a new user
router.post("/register", userValidator.register, userController.register);

//POST request to login an existing user
router.post("/login", userValidator.login, userController.login);

module.exports = router;
