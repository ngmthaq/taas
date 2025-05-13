const { RHS } = require("../../@Core/Services/RequestHandlerService");
const ForbiddenException = require("../../@Core/Exceptions/ForbiddenException");
const USER_ROLE = require("../User/UserRole");

const isAdmin = RHS((req, res, next) => {
  const isAccepted = [USER_ROLE.ADMIN].includes(req?.user?.role);
  if (!isAccepted) {
    throw new ForbiddenException({
      role: "You do not have permission to access this resource",
    });
  }

  next();
});

const isManager = RHS((req, res, next) => {
  const isAccepted = [USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(
    req?.user?.role,
  );

  if (!isAccepted) {
    throw new ForbiddenException({
      role: "You do not have permission to access this resource",
    });
  }

  next();
});

const isUser = RHS((req, res, next) => {
  const isAccepted = [
    USER_ROLE.ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.USER,
  ].includes(req?.user?.role);

  if (!isAccepted) {
    throw new ForbiddenException({
      role: "You do not have permission to access this resource",
    });
  }

  next();
});

const isBotOnly = RHS((req, res, next) => {
  const isAccepted = req?.user?.role === USER_ROLE.BOT;
  if (!isAccepted) {
    throw new ForbiddenException({
      role: "You do not have permission to access this resource",
    });
  }

  next();
});

module.exports = {
  isAdmin,
  isManager,
  isUser,
  isBotOnly,
};
