const User = require("../models/user");
const cookieExtractor = require("../utils/tokenExtracter");
require("dotenv").config();

const JwtStrategy = require("passport-jwt").Strategy;

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      try {
        //Check if user with userId exists in the database
        const existingUser = await User.findOne(
          { _id: jwt_payload.userId },
          { password: 0 }
        );

        //If it exists, then send the user else return false
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
