const Comments = require("../models/comments.model");

const listComments = async (req, res) => {
  try {
    const comments = await Comments.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentsById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comments.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createComment = async (req, res) => {
  try {
    const newComment = new Comments(req.body);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comments.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedComment)
      return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comments.findByIdAndDelete(id);
    if (!deletedComment)
      return res.status(404).json({ message: "Comment not found" });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listComments,
  getCommentsById,
  createComment,
  updateComment,
  deleteComment,
};
