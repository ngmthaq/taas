const express = require("express");
const webRouter = express.Router();
const HomeController = require("../Controllers/HomeController");

const web = [
  {
    method: "get",
    path: "/",
    middlewares: [],
    controller: HomeController.renderHomePage,
  },
];

web.forEach((route) => {
  webRouter[route.method](route.path, ...route.middlewares, route.controller);
});

module.exports = { webRouter, web };
