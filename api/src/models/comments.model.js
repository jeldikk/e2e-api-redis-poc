const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    body: { type: String, required: true },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "comments",
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
