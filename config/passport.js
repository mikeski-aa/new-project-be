const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { prisma } = require("../config/db");
const { validatePassword } = require("../utils/passportUtils");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {
  prisma.user
    .findFirst({
      where: {
        username: username,
      },
    })
    .then((user) => {
      if (!user) {
        console.log("USER NOT FOUND");
        // user not present in DB
        // pass done callback to passport stating user was not found
        return done(null, false);
      }
      // function checking validity from utils -> compares password hash v.s stored hash
      // true or false
      const isValid = validatePassword(password, user.hash);
      if (isValid) {
        console.log("validation OK");
        return done(null, user);
      } else {
        console.log("wrong pass");
        return done(null, false);
      }
    })
    .catch((err) => {
      console.log("error encountered");
      done(err);
    });
};

// new strat requires verify callback
const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

/// JWT strategy part
const verifyJWTCallback = (jwt_payload, done) => {
  console.log("????");
  prisma.user
    .findFirst({
      where: {
        username: jwt_payload.username,
      },
    })
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      done(error, false, { message: "Token missing" });
    });
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
    },
    verifyJWTCallback
  )
);
