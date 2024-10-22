const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controllers/apiController");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validationMiddleware");
const passport = require("passport");

// get base API route
apiRouter.get("/", (req, res, next) => {
  res.send("API");
});

// create new user route
apiRouter.post("/register", registerValidation, apiController.postRegister);

// login existing user route
// login validation middleware will be required!
apiRouter.post(
  "/login",
  loginValidation,
  passport.authenticate("local", { session: false }),
  apiController.postLogin
);

module.exports = apiRouter;
