const express = require("express");
const postsController = require("../controllers/posts.controller");
const postsRouter = express.Router();

postsRouter
  .route("/")
  .get(postsController.listPosts)
  .post(postsController.createPost);

postsRouter
  .route("/:id")
  .get(postsController.getPostById)
  .put(postsController.updatePost)
  .delete(postsController.deletePost);

module.exports = postsRouter;
