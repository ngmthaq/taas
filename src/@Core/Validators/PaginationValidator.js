const { query, validationResult } = require("express-validator");
const { RHS } = require("../Services/RequestHandlerService");
const BadRequestException = require("../Exceptions/BadRequestException");

const PaginationValidator = [
  query("filter")
    .optional()
    .isString()
    .withMessage("Filter must be a string")
    .trim(),

  query("sortCol")
    .optional()
    .isString()
    .withMessage("Sort column must be a string")
    .trim(),

  query("sortDir")
    .optional()
    .isString()
    .withMessage("Sort direction must be a string")
    .isIn(["asc", "desc"])
    .withMessage("Sort direction must be either asc or desc"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a number greater than 0")
    .toInt(),

  query("take")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Take must be a number greater than 0")
    .toInt(),

  query("withTrash")
    .optional()
    .isBoolean()
    .withMessage("With trash must be either true or false")
    .toBoolean(),

  RHS((req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formattedErrors = {};
      errors.array().forEach((error) => {
        formattedErrors[error.path] = error.msg;
      });

      throw new BadRequestException(formattedErrors);
    }

    req.query.filter = req.query.filter || "";
    req.query.sortCol = req.query.sortCol || "id";
    req.query.sortDir = req.query.sortDir || "asc";
    req.query.page = req.query.page ? parseInt(req.query.page) : 1;
    req.query.take = req.query.take ? parseInt(req.query.take) : 10;
    req.query.withTrash = req.query.withTrash === "true" ? true : false;

    next();
  }),
];

module.exports = PaginationValidator;
