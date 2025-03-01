const express = require("express");

module.exports = {
  /**
   * Render the home page.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  renderHomePage: function (req, res, next) {
    res.render("HomePage", { title: "Express" });
  },
};
