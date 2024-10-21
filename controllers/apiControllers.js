const asyncHandler = require("express-async-handler");
const { genPassword } = require("../utils/passportUtils");

exports.postRegister = asyncHandler(async (req, res, next) => {
  // validate input via middleware
  const hash = await genPassword(req.body.password);

  // call service to create new user
});
