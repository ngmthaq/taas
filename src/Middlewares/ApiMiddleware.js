const express = require("express");

module.exports = {
  /**
   * Sample middleware.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  test: function (req, res, next) {
    next();
  },
};
