const express = require("express");
const router = express.Router();
const SampleMiddleware = require("../Middlewares/SampleMiddleware");
const SampleController = require("../Controllers/SampleController");

router.get("/", SampleMiddleware.test, SampleController.sampleMethod);

module.exports = router;
