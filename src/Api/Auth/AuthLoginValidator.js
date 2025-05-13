const { validationResult, body } = require("express-validator");
const { RHS } = require("../../@Core/Services/RequestHandlerService");
const BadRequestException = require("../../@Core/Exceptions/BadRequestException");

const AuthLoginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .trim()
    .normalizeEmail(),

  body("password")
    .isString()
    .withMessage("Please provide a valid password")
    .trim(),

  RHS(async (req, res, next) => {
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

module.exports = AuthLoginValidator;
