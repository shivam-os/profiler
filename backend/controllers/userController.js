const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const httpResponses = require("../utils/httpResponses");
const responseObj = "User";

//Check if user with given email already exists
const ifUserExists = async (email) => {
  try {
    const existingUser = User.findOne({ email: email });
    if (existingUser) {
      return existingUser;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

//POST method to register a new user
exports.register = async (req, res) => {
  //Handle errors coming from the user register validator
  if (httpResponses.validationError(req, res)) {
    return 
  }

  try {
    const { name, email, password } = req.body;

    //Check if user with given email already exists
    if (await ifUserExists(email)) {
      return httpResponses.existsError(res, responseObj);
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return httpResponses.createdResponse(res, responseObj)
  } catch (err) {
    console.log(err);
    return httpResponses.serverError(res)
  }
};

//POST method to login a new user
exports.login = async (req, res) => {
  //Handle errors coming from the user login validator
  if (httpResponses.validationError(req, res)) {
    return 
  }
  try {
    const { email, password } = req.body;
    const existingUser = await ifUserExists(email);

    //Check if email with given user exists
    if (!existingUser) {
      return httpResponses.notFoundError(res, responseObj)
    }

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    //If password does not match
    if (!passwordMatched) {
      return res
        .status(400)
        .json({ err: "Incorrect email or password! Please try again." });
    }

    //Create jwt
    const payload = { userId: existingUser._id };
    const bearerToken = await jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      token: bearerToken,
      name: existingUser.name,
      msg: `Welcome back ${existingUser.name}! You are now logged in.`,
    });
  } catch (err) {
    console.log(err);
    return httpResponses.serverError(res);
  }
};
