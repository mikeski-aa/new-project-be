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
// login validation middleware will be required!
// passport.authenticate("local", { session: false }),
apiRouter.post(
  "/login",
  loginValidation,
  loginConfirm,
  apiController.postLogin
);

// get users
apiRouter.get(
  "/users",
  asyncHandler(async (req, res, next) => {
    const response = await prisma.user.findMany();
    console.log(response);
    res.send(response);
  })
);

module.exports = apiRouter;
