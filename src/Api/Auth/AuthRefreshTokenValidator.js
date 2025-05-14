const dayjs = require("dayjs");
const { validationResult, body } = require("express-validator");
const { prisma } = require("../../@Core/Services/DatabaseService");
const { RHS } = require("../../@Core/Services/RequestHandlerService");
const BadRequestException = require("../../@Core/Exceptions/BadRequestException");

const removeRefreshToken = async (token) => {
  await prisma.refreshToken.delete({ where: { token } });
};

const AuthRefreshTokenValidator = [
  body("refreshToken")
    .isUUID()
    .withMessage("Please provide a valid refresh token")
    .trim()
    .custom(async (value) => {
      const token = await prisma.refreshToken.findUnique({
        where: { token: value },
      });

      if (!token) throw new Error("Refresh token not found");

      if (dayjs(token.expiresAt).isBefore(dayjs())) {
        await removeRefreshToken(value);
        throw new Error("Refresh token expired");
      }

      const user = await prisma.user.findUnique({
        where: { id: token.userId, deletedAt: null },
      });

      if (!user) {
        await removeRefreshToken(value);
        throw new Error("User not found");
      }
    }),

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

module.exports = AuthRefreshTokenValidator;
