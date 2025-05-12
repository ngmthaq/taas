const { query, validationResult } = require("express-validator");
const { RHS } = require("../Services/RequestHandlerService");
const BadRequestException = require("../Exceptions/BadRequestException");

const PaginationValidator = [
  query("filter")
    .optional()
    .isString()
    .withMessage("Filter must be a string")
    .trim()
    .default(""),

  query("sortCol")
    .optional()
    .isString()
    .withMessage("Sort column must be a string")
    .trim()
    .default("id"),

  query("sortDir")
    .optional()
    .isString()
    .withMessage("Sort direction must be a string")
    .isIn(["asc", "desc"])
    .withMessage("Sort direction must be either asc or desc")
    .default("asc"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a number greater than 0")
    .toInt()
    .default(1),

  query("take")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Take must be a number greater than 0")
    .toInt()
    .default(10),

  query("withTrash")
    .optional()
    .isBoolean()
    .withMessage("With trash must be either true or false")
    .toBoolean()
    .default(false),

  RHS((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = {};
      errors.array().forEach((error) => {
        formattedErrors[error.path] = error.msg;
      });

      throw new BadRequestException(formattedErrors);
    }

    next();
  }),
];

module.exports = PaginationValidator;
