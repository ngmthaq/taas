const express = require("express");
const BadRequestException = require("../Exceptions/BadRequestException");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const PaginationMiddleware = (req, res, next) => {
  let { filter, sortCol, sortDir, page, take, withTrash } = req.query;

  if (!filter) filter = "";
  if (!sortCol) sortCol = "id";
  if (!sortDir) sortDir = "asc";
  if (!page) page = 1;
  if (!take) take = 10;
  if (!withTrash) withTrash = "false";

  page = Number(page);
  take = Number(take);

  let isValidated = true;
  let errors = {};

  if (typeof filter !== "string") {
    errors.filter = "Filter must be a string";
    isValidated = false;
  }

  if (typeof sortCol !== "string") {
    errors.sortCol = "Sort column must be a string";
    isValidated = false;
  }

  if (typeof sortDir !== "string") {
    errors.sortDir = "Sort direction must be a string";
    isValidated = false;
  } else if (sortDir !== "asc" && sortDir !== "desc") {
    errors.sortDir = "Sort direction must be either asc or desc";
    isValidated = false;
  }

  if (typeof page !== "number" || isNaN(page)) {
    errors.page = "Page must be a number";
    isValidated = false;
  } else if (page < 1) {
    errors.page = "Page must be greater than 0";
    isValidated = false;
  }

  if (typeof take !== "number" || isNaN(take)) {
    errors.take = "Take must be a number";
    isValidated = false;
  } else if (take < 1) {
    errors.take = "Take must be greater than 0";
    isValidated = false;
  }

  if (typeof withTrash !== "string") {
    errors.withTrash = "With trash must be a string";
    isValidated = false;
  } else if (withTrash !== "true" && withTrash !== "false") {
    errors.withTrash = "With trash must be either true or false";
    isValidated = false;
  }

  if (!isValidated) {
    throw new BadRequestException(errors);
  }

  req.query.filter = filter.trim();
  req.query.sortCol = sortCol.trim();
  req.query.sortDir = sortDir;
  req.query.page = page;
  req.query.take = take;
  req.query.withTrash = withTrash === "true" ? true : false;
  next();
};

module.exports = PaginationMiddleware;
