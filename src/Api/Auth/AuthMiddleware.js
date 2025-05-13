const { RHS } = require("../../@Core/Services/RequestHandlerService");
const UnauthorizedException = require("../../@Core/Exceptions/UnauthorizedException");
const TokenService = require("../../@Core/Services/TokenService");
const AuthRepository = require("./AuthRepository");

const AuthMiddleware = RHS(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthorizedException({
      authorization: "Authorization header is missing",
    });
  }

  const tokens = authHeader.split(" ");
  const tokenType = tokens[0];
  if (tokenType !== "Bearer") {
    throw new UnauthorizedException({
      tokenType: "Token type is not Bearer",
    });
  }

  const token = tokens[1];
  if (!token)
    throw new UnauthorizedException({
      token: "Token is missing",
    });

  const decoded = TokenService.verifyAccessToken(token);
  const userId = decoded?.id;
  if (!userId) {
    throw new UnauthorizedException({
      userId: "User ID is missing in token",
    });
  }

  const repo = new AuthRepository();
  const user = await repo.whoami(userId);
  if (!user) {
    throw new UnauthorizedException({
      user: "User not found",
    });
  }

  req.user = user;
  next();
});

module.exports = AuthMiddleware;
