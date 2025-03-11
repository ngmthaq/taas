const express = require("express");
const { isbot } = require("isbot");
const { magenta } = require("console-log-colors");
const enUS = require("../Localization/enUS");
const viVN = require("../Localization/viVN");

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
    const locales = { enUS, viVN };
    const resources = {
      [enUS.key]: enUS.resources,
      [viVN.key]: viVN.resources,
    };
    if (!isBot) return res.render("ReactApp", { locales, resources });
    return next();
  },
};
