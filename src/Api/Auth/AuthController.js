const express = require("express");
const { RHS } = require("../../@Core/Services/RequestHandlerService");

const AuthController = express.Router();

AuthController.get(
  "/whoami",
  RHS((req, res) => {}),
);

AuthController.post(
  "/login",
  RHS((req, res) => {}),
);

AuthController.post(
  "/password/change",
  RHS((req, res) => {}),
);

AuthController.post(
  "/password/forgot",
  RHS((req, res) => {}),
);

AuthController.post(
  "/password/reset",
  RHS((req, res) => {}),
);

AuthController.post(
  "/token/refresh",
  RHS((req, res) => {}),
);

AuthController.post(
  "/logout",
  RHS((req, res) => {}),
);

module.exports = AuthController;
