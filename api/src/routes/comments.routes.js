const express = require("express");
const commentsController = require("../controllers/comments.controller");
const commentsRouter = express.Router();

commentsRouter
  .route("/")
  .get(commentsController.listComments)
  .post(commentsController.createComment);

commentsRouter
  .route("/:id")
  .get(commentsController.getCommentsById)
  .put(commentsController.updateComment)
  .delete(commentsController.deleteComment);

module.exports = commentsRouter;
