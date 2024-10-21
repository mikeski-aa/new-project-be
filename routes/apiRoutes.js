const express = require("express");
const apiRouter = express.Router();

// get base API route
apiRouter.get("/", (req, res, next) => {
  res.send("API");
});

module.exports = apiRouter;
