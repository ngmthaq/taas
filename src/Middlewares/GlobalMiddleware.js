const express = require("express");
const { isbot } = require("isbot");
const { magenta } = require("console-log-colors");

module.exports = {
  /**
   * Middleware to check if the request is from a bot or not.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  isBot: function (req, res, next) {
    const isApi = req.originalUrl.startsWith("/api");
    console.log(magenta("[GLOBAL MIDDLEWARE] isApi: " + isApi));
    if (isApi) return next();
    const isBot = isbot(req.get("user-agent"));
    console.log(magenta("[GLOBAL MIDDLEWARE] isBot: " + isBot));
    if (!isBot) return res.render("ReactApp");
    return next();
  },
};
