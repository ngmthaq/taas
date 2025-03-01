const express = require("express");
const { isbot } = require("isbot");

const SEO_PAGES = ["/"];

module.exports = {
  /**
   * Middleware to check if the request is from a bot or not.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  isBot: function (req, res, next) {
    if (req.originalUrl.startsWith("/api")) return next();
    const userAgent = req.get("user-agent");
    const isBot = isbot(userAgent);
    const isSEOPage = SEO_PAGES.includes(req.originalUrl);
    if (isBot && isSEOPage) return next();
    return res.render("ReactApp");
  },
};
