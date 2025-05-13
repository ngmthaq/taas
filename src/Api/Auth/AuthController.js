const express = require("express");
const { RHS } = require("../../@Core/Services/RequestHandlerService");
const TokenService = require("../../@Core/Services/TokenService");
const BadRequestException = require("../../@Core/Exceptions/BadRequestException");
const AuthLoginValidator = require("./AuthLoginValidator");
const AuthRepository = require("./AuthRepository");
const AuthenticationMiddleware = require("./AuthenticationMiddleware");

const AuthController = express.Router();

AuthController.get(
  "/whoami",
  AuthenticationMiddleware,
  RHS((req, res) => {
    return res.json(req.user);
  }),
);

AuthController.post(
  "/login",
  AuthLoginValidator,
  RHS(async (req, res) => {
    const repo = new AuthRepository();
    const user = await repo.login(req.body.email, req.body.password);
    if (!user) {
      throw new BadRequestException({
        credential: "Invalid email or password",
      });
    }

    const accessToken = TokenService.createAccessToken(user);
    const refreshToken = TokenService.createRefreshToken();
    await repo.saveRefreshToken(user.id, refreshToken);

    return res.json({
      user,
      accessToken,
      refreshToken,
    });
  }),
);

AuthController.post(
  "/password/change",
  AuthenticationMiddleware,
  RHS((req, res) => {}),
);

AuthController.post(
  "/password/forgot",
  RHS((req, res) => {}),
);

AuthController.post(
  "/password/reset",
  RHS((req, res) => {}),
);

AuthController.post(
  "/token/refresh",
  RHS((req, res) => {}),
);

AuthController.post(
  "/logout",
  AuthenticationMiddleware,
  RHS((req, res) => {}),
);

module.exports = AuthController;
