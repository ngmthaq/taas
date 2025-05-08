const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { red } = require("console-log-colors");
const IsBotMiddleware = require("./Middlewares/IsBotMiddleware");
const NotFoundException = require("./Exceptions/NotFoundException");
const HomeController = require("./Controller/HomeController");

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
app.use(IsBotMiddleware);

// routes setup
app.use("/", HomeController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  throw new NotFoundException();
});

// error handler
app.use(function (err, req, res, next) {
  console.log(red("[ERROR]: " + JSON.stringify(err)));
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const outputDetails = err.details || err || {};
  const details = req.app.get("env") === "development" ? outputDetails : {};
  res.status(status).json({ status, message, details });
});

// export app
module.exports = app;
