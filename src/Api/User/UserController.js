const express = require("express");
const { RHS } = require("../../@Core/Services/RequestHandlerService");
const NotFoundException = require("../../@Core/Exceptions/NotFoundException");
const PaginationValidator = require("../../@Core/Validators/PaginationValidator");
const UserRepository = require("./UserRepository");
const UserIdValidator = require("./UserIdValidator");

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
    if (!user) throw new NotFoundException({ user: "User not found!" });

    return res.json(user);
  }),
);

UserController.post(
  "/",
  RHS((req, res) => {}),
  RHS((req, res) => {}),
);

UserController.put(
  "/:id",
  RHS((req, res) => {}),
);

UserController.delete(
  "/:id",
  RHS((req, res) => {}),
);

module.exports = UserController;
