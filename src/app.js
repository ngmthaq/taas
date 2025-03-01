const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { red } = require("console-log-colors");
const WebRouter = require("./Router/WebRouter");
const ApiRouter = require("./Router/ApiRouter");
const GlobalMiddleware = require("./Middlewares/GlobalMiddleware");
const WebMiddleware = require("./Middlewares/WebMiddleware");
const ApiMiddleware = require("./Middlewares/ApiMiddleware");

// app setup
const app = express();

// view engine setup
app.set("view engine", "ejs");
app.set("views", [
  path.resolve(__dirname, "./Views/CSR"),
  path.resolve(__dirname, "./Views/SSR"),
]);

// middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(GlobalMiddleware.isBot);

// web route setup
app.use("/", WebMiddleware.test, WebRouter);

// api route setup
app.use("/api", ApiMiddleware.test, ApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(red(err));
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("ErrorPage");
});

// export app
module.exports = app;
