const express = require("express");

module.exports = {
  /**
   * Sample method.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  sampleMethod: function (req, res, next) {
    res.json({ message: "Sample method" });
  },
};
