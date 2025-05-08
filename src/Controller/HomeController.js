const express = require("express");
const HomeController = express.Router();

HomeController.get("/", (req, res) => {
  res.send("Welcome to the Home Page, BOT!");
});

module.exports = HomeController;
