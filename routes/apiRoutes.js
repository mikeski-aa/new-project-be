const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controllers/apiController");
const { registerValidation } = require("../middleware/validationMiddleware");

// get base API route
apiRouter.get("/", (req, res, next) => {
  res.send("API");
});

// create new user
apiRouter.post("/register", registerValidation, apiController.postRegister);

module.exports = apiRouter;
