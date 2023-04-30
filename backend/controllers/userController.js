const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const handleErrors = require("../utils/validators/handleErrors");

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
  handleErrors(req, res);
  try {
    const { name, email, password } = req.body;

    //Check if user with given email already exists
    if (await ifUserExists(email)) {
      return res
        .status(403)
        .json({ err: "User with given email already exists. Try login!" });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ msg: "User created successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};

//POST method to login a new user
exports.login = async (req, res) => {
  //Handle errors coming from the user login validator
  handleErrors(req, res);
  try {
    const { email, password } = req.body;
    const existingUser = await ifUserExists(email);

    //Check if email with given user exists
    if (!existingUser) {
      return res
        .status(404)
        .json({ err: "User with given email does not exist. Try register!" });
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
    return res
      .status(500)
      .json({ err: "Something has went wrong. Please try again later!" });
  }
};
