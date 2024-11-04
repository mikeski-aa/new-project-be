const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const cron = require("node-cron");

require("dotenv").config();

// without actually importing passport setup file the login wont work
require("./config/passport");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/apiRoutes");

const app = express();

const corsOptions = {
  origin: [process.env.LOCAL_URL, process.env.NONLOCAL_URL],
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

// setting up job scheduler
cron.schedule("0 */3 * * *", async () => {
  console.log("running a task every 3 hours");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
