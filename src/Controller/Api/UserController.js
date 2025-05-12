const express = require("express");
const { RHS } = require("../../Services/RequestHandlerService");
const PaginationMiddleware = require("../../Middlewares/PaginationMiddleware");
const NotFoundException = require("../../Exceptions/NotFoundException");
const BadRequestException = require("../../Exceptions/BadRequestException");
const UserRepository = require("../../Repositories/UserRepository");

const UserController = express.Router();

UserController.get(
  "/",
  PaginationMiddleware,
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
  RHS(async (req, res, next) => {
    const id = Number(req.params.id);
    const errorMessage = "Please provide correct user id";
    if (isNaN(id)) throw new BadRequestException({ userId: errorMessage });
    if (id < 1) throw new BadRequestException({ userId: errorMessage });
    req.params.id = id;
    if (req.query.withTrash === "true") req.query.withTrash = true;
    else req.query.withTrash = false;
    next();
  }),
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
