const express = require("express");

/**
 * RHS (Request Handler Service)
 * Higher-order function that wraps an Express route handler with error handling
 *
 * @param {express.RequestHandler} callback - Express route handler function
 * @returns {express.RequestHandler} - Wrapped handler with Promise error catching
 */
function RHS(callback) {
  return function (req, res, next) {
    return Promise.resolve(callback(req, res, next)).catch(next);
  };
}

module.exports = { RHS };
