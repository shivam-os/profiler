const { body } = require("express-validator");

//Validator for creating a new link
exports.createLink = [
  body("siteName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name field cannot be empty!")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Site name must contain minimum 3 letters and maximum 100 letters!"
    ),

  body("siteUrl")
    .trim()
    .not()
    .isEmpty()
    .withMessage("About field cannot be empty!")
    .isLength({ min: 3, max: 500 })
    .withMessage(
      "Site link must contain minimum 3 letters and maximum 100 letters!"
    )
];


