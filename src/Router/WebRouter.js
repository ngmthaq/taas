const express = require("express");
const webRouter = express.Router();
const HomeController = require("../Controllers/HomeController");

const webRoutes = {
  home: {
    method: "get",
    path: "/",
    middlewares: [],
    controller: HomeController.renderHomePage,
  },
};

Object.values(webRoutes).forEach((route) => {
  webRouter[route.method](route.path, ...route.middlewares, route.controller);
});

module.exports = { webRouter, webRoutes };
