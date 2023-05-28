const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const httpResponses = require("../utils/httpResponses");
const tokenValidity = 24 * 60 * 60 * 1000; //1 day
const cookieOptions = {
  maxAge: tokenValidity,
  httpOnly: true,
  secure: true,
  sameSite: "none",
  domain: "onrender.com"
};

const responseObj = "User";

//POST method to register a new user
exports.register = async (req, res) => {
  //Handle errors coming from the user register validator
  if (httpResponses.validationError(req, res)) {
    return;
  }

  try {
    const { name, email, password } = req.body;

    //Check if user with given email already exists
    if (await User.findOne({ email })) {
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

    return httpResponses.createdResponse(res, responseObj);
  } catch (err) {
    console.log(err);
    return httpResponses.serverError(res);
  }
};

//POST method to login a new user
exports.login = async (req, res) => {
  //Handle errors coming from the user login validator
  if (httpResponses.validationError(req, res)) {
    return;
  }
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    //Check if email with given user exists
    if (!existingUser) {
      return httpResponses.notFoundError(res, responseObj);
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
        expiresIn: `${tokenValidity}`,
      }
    );

    return res
      .cookie("token", bearerToken, cookieOptions)
      .status(200)
      .json({
        token: bearerToken,
        name: existingUser.name,
        msg: `Welcome back ${existingUser.name}! You are now logged in.`,
      });
  } catch (err) {
    console.log(err);
    return httpResponses.serverError(res);
  }
};

//GET method to verify if user is logged in
exports.verify = async (req, res) => {
  return res.status(200).json({ msg: "You are currently logged in!" });
};

//POST method to logout the existing user
exports.logout = (req, res) => {
  return res
    .status(201)
    .clearCookie("token", req.cookies.token, cookieOptions)
    .json({ msg: `You are logged out! We hope to see you soon.` });
};
