const asyncHandler = require("express-async-handler");
const { genPassword } = require("../utils/passportUtils");
const { createNewUser } = require("../services/userCalls");
const jwt = require("jsonwebtoken");

exports.postRegister = asyncHandler(async (req, res, next) => {
  // validate input via middleware
  const hash = await genPassword(req.body.password);

  // call service to create new user
  const response = await createNewUser(req.body.username, hash);

  console.log(response);
  res.json(response);
});

exports.postLogin = asyncHandler(async (req, res, next) => {
  console.log("post login function entered");
  console.log(req.user.username);
  const token = jwt.sign({ username: req.user.username }, "secret", {
    expiresIn: "12h",
  });
  return res.json({ token: token, user: req.user });
});
