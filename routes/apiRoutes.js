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

// get all stores
apiRouter.get(
  "/stores",
  passport.authenticate("jwt", { session: false }),
  apiController.getStores
);

// get specific store
apiRouter.get(
  "/stores/store",
  passport.authenticate("jwt", { session: false }),
  apiController.getStore
);

// post a new store
apiRouter.post(
  "/stores",
  passport.authenticate("jwt", { session: false }),
  apiController.postStore
);

apiRouter.delete(
  "/stores",
  passport.authenticate("jwt", { session: false }),
  apiController.deleteStore
);

// update store name / location
apiRouter.put(
  "/stores",
  passport.authenticate("jwt", { session: false }),
  apiController.updateStore
);

apiRouter.post(
  "/product",
  passport.authenticate("jwt", { session: false }),
  apiController.postProduct
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
