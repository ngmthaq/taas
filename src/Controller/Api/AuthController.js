const express = require("express");
const AuthController = express.Router();

AuthController.get("/whoami", (req, res) => {});

AuthController.post("/login", (req, res) => {});

AuthController.post("/password/change", (req, res) => {});

AuthController.post("/password/forgot", (req, res) => {});

AuthController.post("/password/reset", (req, res) => {});

AuthController.post("/token/refresh", (req, res) => {});

AuthController.post("/logout", (req, res) => {});

module.exports = AuthController;
