const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controllers/apiController");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validationMiddleware");
const { prisma } = require("../config/db");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { loginConfirm } = require("../authTest/loginSelf");

// get base API route
apiRouter.get("/", (req, res, next) => {
  res.send("API");
});

// create new user route
apiRouter.post("/register", registerValidation, apiController.postRegister);

// login existing user route
apiRouter.post(
  "/login",
  loginValidation,
  passport.authenticate("local", { session: false }),
  apiController.postLogin
);

// check if user is logged in, returning the user back to frontend
apiRouter.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  apiController.getLogin
);

apiRouter.post("/login/guest", apiController.postGuestCreate);

apiRouter.get(
  "/stores",
  passport.authenticate("jwt", { session: false }),
  apiController.getStores
);

// get users
apiRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log(req.user);
  }
);

module.exports = apiRouter;
