const { validationResult, body } = require("express-validator");
const { prisma } = require("../../@Core/Services/DatabaseService");
const { RHS } = require("../../@Core/Services/RequestHandlerService");
const { compare } = require("../../@Core/Services/EncryptionService");
const BadRequestException = require("../../@Core/Exceptions/BadRequestException");

const AuthChangePasswordValidator = [
  body("oldPassword")
    .isString()
    .withMessage("Please provide a valid password")
    .trim()
    .custom(async (value, { req }) => {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id, deletedAt: null },
      });

      if (!user) throw new Error("User not found");

      const isPasswordValid = compare(value, user.password);
      if (!isPasswordValid) throw new Error("Old password is incorrect");
    }),

  body("newPassword")
    .isString()
    .withMessage("Please provide a valid password")
    .trim()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      [
        "New password must be at least 8 characters long,",
        "contain at least one uppercase letter,",
        "one lowercase letter,",
        "one number,",
        "and one special character",
      ].join(" "),
    ),

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

module.exports = AuthChangePasswordValidator;
