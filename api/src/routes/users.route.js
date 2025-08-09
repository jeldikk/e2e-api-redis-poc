const express = require("express");
const usersController = require("../controllers/users.controller");
const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(usersController.listUsers)
  .post(usersController.createUser);

usersRouter
  .route("/:id")
  .get(usersController.getUserById)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = usersRouter;
