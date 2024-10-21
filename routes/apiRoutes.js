const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controllers/apiController");
// get base API route
apiRouter.get("/", (req, res, next) => {
  res.send("API");
});

// create new user
apiRouter.post("/register", apiController.postRegister);

module.exports = apiRouter;
