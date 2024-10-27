const asyncHandler = require("express-async-handler");
const { genPassword } = require("../utils/passportUtils");
const { createNewUser, getGuestInfo } = require("../services/userCalls");
const jwt = require("jsonwebtoken");
const {
  getStores,
  getStore,
  addStore,
  deleteStore,
  updateStore,
} = require("../services/storeCalls");
const { body, query, param, validationResult } = require("express-validator");
const { json } = require("express");
const { addProduct } = require("../services/productCalls");

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

// TO DO:
// probably need to handle inputs to make sure they are valid
exports.getStores = [
  query("userid").isLength({ min: 1 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.query.userid);
    if (!errors.isEmpty()) {
      console.log("query validation failed");
      // res.status(400).json({ message: "Input validation failed" });
      return false;
    }
    const stores = await getStores(req.query.userid);
    console.log("here");
    console.log(stores);
    return res.json(stores);
  }),
];

// TO DO:
// probably need to handle inputs to make sure they are valid
exports.getStore = [
  query("storeid").isLength({ min: 1 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("body validation failed");
      // res.status(400).json({ message: "Input validation failed" });
      return false;
    }
    const store = await getStore(req.query.storeid);

    return res.json(store);
  }),
];

// error handling needs to be added
exports.postStore = [
  body("name").isLength({ min: 1, max: 30 }),
  body("location").isLength({ min: 1, max: 30 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("body validation failed");
      // res.status(400).json({ message: "Input validation failed" });
      return false;
    }

    // call db service
    const newStore = await addStore(
      req.body.name,
      req.body.location,
      req.body.userId
    );

    return res.json(newStore);
  }),
];

// error handling needs to be added
// this should also delete all store items right?
exports.deleteStore = [
  body("userId").isNumeric(),
  body("storeId").isNumeric(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("body validation failed");
      // res.status(400).json({ message: "Input validation failed" });
      return false;
    }

    // call db service
    const storeDelete = await deleteStore(req.body.userId, req.body.storeId);

    res.json(storeDelete);
  }),
];

exports.updateStore = [
  body("name").isLength({ min: 1, max: 30 }),
  body("location").isLength({ min: 1, max: 30 }),
  body("userid").isLength({ min: 1 }),
  body("storeid").isLength({ min: 1 }),
  asyncHandler(async (req, res, next) => {
    const response = await updateStore(
      req.body.userid,
      req.body.storeid,
      req.body.name,
      req.body.location
    );

    res.json(response);
  }),
];

exports.postProduct = asyncHandler(async (req, res, next) => {
  console.log(req.body.items);

  const response = await addProduct(req.body.items);
  console.log(response);

  res.json(true);
});
