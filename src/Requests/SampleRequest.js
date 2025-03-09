const { blue } = require("console-log-colors");
const express = require("express");

module.exports = {
  /**
   * Sample request.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  test: function (req, res, next) {
    console.log(blue("Validate request here"));
    next();
  },
};
