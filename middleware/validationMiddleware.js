const { body, validationResult } = require("express-validator");
const { prisma } = require("../config/db");
const asyncHandler = require("express-async-handler");

exports.registerValidation = [
  body("username").isLength({ min: 1, max: 15 }),
  body("password").isLength({ min: 1, max: 30 }),
  body("confirmPassword").isLength({ min: 1, max: 30 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Input validation failed" });
    }

    if (req.body.password != req.body.confirmPassword) {
      return res.status(400).json({ message: "Password mismatch" });
    }

    // check if username is not already taken
    try {
      const response = await prisma.user.findFirst({
        where: {
          username: req.body.username,
        },
      });

      if (response != null) {
        return res.status(400).json({ message: "Username already in use" });
      }
    } catch (error) {
      console.log(error);
    }

    return next();
  }),
];

exports.loginValidation = [
  body("username").isLength({ min: 1, max: 15 }),
  body("password").isLength({ min: 1, max: 30 }),

  function (req, res, next) {
    console.log("working");

    console.log(req.body.username);
    console.log(req.body.password);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Input length validation failed" });
    }

    return next();
  },
];
