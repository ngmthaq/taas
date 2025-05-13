const { body, validationResult } = require("express-validator");
const BadRequestException = require("../../@Core/Exceptions/BadRequestException");
const { RHS } = require("../../@Core/Services/RequestHandlerService");
const UserRepository = require("./UserRepository");
const USER_GENDER = require("./UserGender");

/**
 * Middleware for validating user data against schema
 *
 * @param {boolean} isUpdate - If true, validation is for updates (makes some fields optional)
 * @returns {Array} - Array of Express validator middleware
 */
const validateUserSchema = (isUpdate = false) => {
  const GENDERS = Object.values(USER_GENDER);

  const validations = [
    body("email")
      .if(() => isUpdate === false)
      .isEmail()
      .withMessage("Valid email address is required")
      .normalizeEmail()
      .custom(async (value) => {
        const repo = new UserRepository();
        const user = await repo.findByEmail(value);
        if (user) throw new Error("User email already in use");
      }),

    body("name")
      .if((_, { req }) => isUpdate === false || req.body.name !== undefined)
      .notEmpty()
      .withMessage("Name is required"),

    body("dob")
      .if((_, { req }) => isUpdate === false || req.body.dob !== undefined)
      .isISO8601()
      .withMessage("Date of birth must be a valid date")
      .toDate(),

    body("gender")
      .if((_, { req }) => isUpdate === false || req.body.gender !== undefined)
      .isIn(GENDERS)
      .withMessage("Gender must be " + GENDERS.join(", "))
      .default(USER_GENDER.OTHER),

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

  return validations;
};

module.exports = {
  ValidateCreateUser: validateUserSchema(false),
  ValidateUpdateUser: validateUserSchema(true),
};
