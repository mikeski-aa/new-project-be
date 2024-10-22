const { prisma } = require("../config/db");
const { validatePassword } = require("../utils/passportUtils");

// issues with passport.js made me rewrite it myself
exports.loginConfirm = async (req, res, next) => {
  prisma.user
    .findFirst({
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (!user) {
        console.log("user not found");
        return res.json({ error: "User login failed" });
      }

      const isValid = validatePassword(req.body.password, user.hash);

      if (isValid) {
        console.log("valid confirmed");
        req.user = user;
        return next();
      } else {
        console.log("valid failed");
        return res.json({ error: "User login failed" });
      }
    })
    .catch((error) => {
      console.log("error encountered");
      next(error);
    });
};
