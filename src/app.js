const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const clc = require("console-log-colors");
const IsBotMiddleware = require("./@Core/Middlewares/IsBotMiddleware");
const NotFoundException = require("./@Core/Exceptions/NotFoundException");
const HomeController = require("./Home/HomeController");
const AuthController = require("./Api/Auth/AuthController");
const UserController = require("./Api/User/UserController");

// app setup
const app = express();

// view engine setup
app.set("view engine", "ejs");
app.set("views", [
  path.resolve(__dirname, "./@Core/Views/CSR"),
  path.resolve(__dirname, "./@Core/Views/SSR"),
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
app.use("/api/v1/auth", AuthController);
app.use("/api/v1/users", UserController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  throw new NotFoundException();
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const outputDetails = err.details || err || {};
  const details = req.app.get("env") === "development" ? outputDetails : {};
  if (status === 500) console.log(clc.red("[ERROR]: " + JSON.stringify(err)));
  res.status(status).json({ status, message, details });
});

// export app
module.exports = app;
