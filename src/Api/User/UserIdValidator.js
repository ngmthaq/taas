const { param, query, validationResult } = require("express-validator");
const { RHS } = require("../../@Core/Services/RequestHandlerService");
const BadRequestException = require("../../@Core/Exceptions/BadRequestException");

const UserIdValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Please provide correct user id")
    .toInt(),

  query("withTrash")
    .optional()
    .isBoolean()
    .withMessage("withTrash must be true or false")
    .toBoolean(),

  RHS(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = {};
      errors.array().forEach((error) => {
        formattedErrors[error.path] = error.msg;
      });

      throw new BadRequestException(formattedErrors);
    }

    if (req.query.withTrash === undefined) {
      req.query.withTrash = false;
    }

    next();
  }),
];

module.exports = UserIdValidator;
