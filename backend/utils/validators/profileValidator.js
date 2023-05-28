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

  body("about")
    .trim()
    .not()
    .isEmpty()
    .withMessage("About field cannot be empty!")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Name field must contain minimum 3 letters and maximum 100 letters!"
    ),

  body("sites").optional(),

  body("sites.*.siteName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name field cannot be empty!")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Site name must contain minimum 3 letters and maximum 100 letters!"
    ),

  body("sites.*.siteUrl")
    .trim()
    .not()
    .isEmpty()
    .withMessage("About field cannot be empty!")
    .isLength({ min: 3, max: 500 })
    .withMessage(
      "Site link must contain minimum 3 letters and maximum 100 letters!"
    ),
];
