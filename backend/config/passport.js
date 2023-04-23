const User = require("../models/user");
require("dotenv").config();

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      try {
        //Check if user with userId exists in the database
        const existingUser = await User.findOne({ _id: jwt_payload.userId }, {password: 0});

        //If it exists, then send the userId else return false
        if (existingUser) {
          return done(null, existingUser);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(null, false);
      }
    })
  );
};
