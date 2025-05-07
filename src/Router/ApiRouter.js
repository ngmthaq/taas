const express = require("express");
const apiRouter = express.Router();
const SampleRequest = require("../Requests/SampleRequest");
const SampleController = require("../Controllers/SampleController");

const apiRoutes = {
  sample: {
    method: "get",
    path: "/",
    middlewares: [SampleRequest.test],
    controller: SampleController.sampleMethod,
  },
};

Object.values(apiRoutes).forEach((route) => {
  apiRouter[route.method](route.path, ...route.middlewares, route.controller);
});

module.exports = { apiRouter, apiRoutes };
