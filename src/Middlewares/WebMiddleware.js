const express = require("express");
const { magenta } = require("console-log-colors");

module.exports = {
  /**
   * Sample middleware.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  test: function (req, res, next) {
    console.log(magenta("[WEB MIDDLEWARE] test"));
    next();
  },
};
