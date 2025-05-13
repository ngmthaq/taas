const express = require("express");
const { RHS } = require("../../@Core/Services/RequestHandlerService");
const PaginationValidator = require("../../@Core/Validators/PaginationValidator");
const AuthenticationMiddleware = require("../Auth/AuthenticationMiddleware");
const AuthorizationMiddleware = require("../Auth/AuthorizationMiddleware");
const UserRepository = require("./UserRepository");
const UserIdValidator = require("./UserIdValidator");
const UserCreationValidator = require("./UserCreationValidator");

const UserController = express.Router();

UserController.get(
  "/",
  AuthenticationMiddleware,
  AuthorizationMiddleware.isManager,
  PaginationValidator,
  RHS(async (req, res) => {
    const repo = new UserRepository();
    const response = await repo.findAll(
      req.query.filter,
      req.query.sortCol,
      req.query.sortDir,
      req.query.page,
      req.query.take,
      req.query.withTrash,
    );

    return res.json(response);
  }),
);

UserController.get(
  "/:id",
  AuthenticationMiddleware,
  AuthorizationMiddleware.isManager,
  UserIdValidator,
  RHS(async (req, res) => {
    const repo = new UserRepository();
    const user = await repo.findById(req.params.id, req.query.withTrash);

    return res.json(user);
  }),
);

UserController.post(
  "/",
  AuthenticationMiddleware,
  AuthorizationMiddleware.isManager,
  UserCreationValidator.ValidateCreateUser,
  RHS(async (req, res) => {
    const repo = new UserRepository();
    const user = await repo.create(req.body);

    return res.json(user);
  }),
);

UserController.put(
  "/:id",
  AuthenticationMiddleware,
  AuthorizationMiddleware.isManager,
  UserIdValidator,
  UserCreationValidator.ValidateUpdateUser,
  RHS(async (req, res) => {
    const repo = new UserRepository();
    const updatedUser = await repo.update(req.params.id, req.body);

    return res.json(updatedUser);
  }),
);

UserController.delete(
  "/:id",
  AuthenticationMiddleware,
  AuthorizationMiddleware.isManager,
  UserIdValidator,
  RHS(async (req, res) => {
    const repo = new UserRepository();
    const deletedUser = await repo.delete(req.params.id);

    return res.json(deletedUser);
  }),
);

module.exports = UserController;
