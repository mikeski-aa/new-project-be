const { body, validationResult } = require("express-validator");

exports.registerValidation = [
  body("username").isLength({ min: 1, max: 15 }),
  body("password").isLength({ min: 1, max: 30 }),
  body("confirmPassword").isLength({ min: 1, max: 30 }),

  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Input validation failed" });
    }

    if (req.body.password != req.body.confirmPassword) {
      return res.status(400).json({ message: "Password mismatch" });
    }

    return next();
  },
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
