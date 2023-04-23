const { body } = require("express-validator");

//Validator for creating a new profile
exports.createProfile = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name field cannot be empty!")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Name field must contain minimum 3 letters and maximum 100 letters!"
    )
    .isAlpha("en-US", { ignore: " " })
    .withMessage(
      "Name field cannot contain any numbers or special characters!"
    ),

  body("image")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Image field cannot be empty!"),

  body("links.siteName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Image field cannot be empty!"),

  body("links.siteUrl")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Image field cannot be empty!"),
];
