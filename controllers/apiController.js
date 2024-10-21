const asyncHandler = require("express-async-handler");
const { genPassword } = require("../utils/passportUtils");
const { createNewUser } = require("../services/userCalls");

exports.postRegister = asyncHandler(async (req, res, next) => {
  // validate input via middleware
  const hash = await genPassword(req.body.password);

  // call service to create new user
  const response = await createNewUser(req.body.username, hash);

  console.log(response);
  res.json(response);
});
