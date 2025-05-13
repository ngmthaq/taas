const express = require("express");
const { RHS } = require("../../@Core/Services/RequestHandlerService");
const NotFoundException = require("../../@Core/Exceptions/NotFoundException");
const PaginationValidator = require("../../@Core/Validators/PaginationValidator");
const UserRepository = require("./UserRepository");
const UserIdValidator = require("./UserIdValidator");
const UserCreationValidator = require("./UserCreationValidator");

const UserController = express.Router();

UserController.get(
  "/",
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
  UserIdValidator,
  RHS(async (req, res) => {
    const repo = new UserRepository();
    const user = await repo.findById(req.params.id, req.query.withTrash);

    return res.json(user);
  }),
);

UserController.post(
  "/",
  UserCreationValidator.ValidateCreateUser,
  RHS(async (req, res) => {
    const repo = new UserRepository();
    const user = await repo.create(req.body);

    return res.json(user);
  }),
);

UserController.put(
  "/:id",
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
  UserIdValidator,
  RHS(async (req, res) => {
    const repo = new UserRepository();
    const deletedUser = await repo.delete(req.params.id);

    return res.json(deletedUser);
  }),
);

module.exports = UserController;
