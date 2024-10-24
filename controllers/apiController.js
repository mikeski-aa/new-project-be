const asyncHandler = require("express-async-handler");
const { genPassword } = require("../utils/passportUtils");
const { createNewUser, getGuestInfo } = require("../services/userCalls");
const jwt = require("jsonwebtoken");
const { getStores, getStore } = require("../services/storeCalls");

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
  const token = jwt.sign(
    { username: req.user.username },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "12h",
    }
  );

  // define user object to return
  const returnObject = {
    username: req.user.username,
    id: req.user.id,
    isGuest: req.user.isGuest,
  };

  return res.json({ token: token, user: returnObject });
});

// get login data back to frontend
exports.getLogin = asyncHandler(async (req, res, next) => {
  res.json(req.user);
});

exports.postGuestCreate = asyncHandler(async (req, res, next) => {
  // call service to create guest account

  const token = jwt.sign(
    { username: process.env.GUEST_USER },
    process.env.TOKEN_SECRET
  );

  const guestInfo = await getGuestInfo(process.env.GUEST_USER);

  const returnObject = {
    username: guestInfo.username,
    id: guestInfo.id,
    isGuest: guestInfo.isGuest,
  };

  return res.json({ token: token, user: returnObject });
});

exports.getStores = asyncHandler(async (req, res, next) => {
  const stores = await getStores(req.query.userid);
  console.log(stores);
  return res.json(stores);
});

exports.getStore = asyncHandler(async (req, res, next) => {
  const store = await this.getStore(req.query.storeid);

  return res.json(store);
});
