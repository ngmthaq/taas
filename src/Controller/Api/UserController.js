const express = require("express");
const PaginationMiddleware = require("../../Middlewares/PaginationMiddleware");
const UserRepository = require("../../Repositories/UserRepository");

const UserController = express.Router();

UserController.get("/", PaginationMiddleware, async (req, res) => {
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
});

UserController.get("/:id", (req, res) => {});

UserController.post("/", (req, res) => {});

UserController.put("/:id", (req, res) => {});

UserController.delete("/:id", (req, res) => {});

module.exports = UserController;
