const express = require("express");
const { RHS } = require("../@Core/Services/RequestHandlerService");

const HomeController = express.Router();

HomeController.get(
  "/",
  RHS((req, res) => {
    res.send("Welcome to the Home Page, BOT!");
  }),
);

module.exports = HomeController;
