const express = require("express");
const { isbot } = require("isbot");
const enUS = require("../Localization/enUS");
const viVN = require("../Localization/viVN");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const IsBotMiddleware = (req, res, next) => {
  const isApi = req.originalUrl.startsWith("/api");
  if (isApi) return next();
  const isBot = isbot(req.get("user-agent"));
  if (isBot) return next();
  const locales = { enUS, viVN };
  const resources = {
    [enUS.key]: enUS.resources,
    [viVN.key]: viVN.resources,
  };
  return res.render("ReactApp", { locales, resources });
};

module.exports = IsBotMiddleware;
