const Posts = require("../models/posts.model");

const listPosts = async (req, res) => {
  try {
    const posts = await Posts.find({}, { createdAt: 0, updatedAt: 0 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id, { createdAt: 0, updatedAt: 0 });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post." });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = new Posts(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post." });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Posts.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post." });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Posts.findByIdAndDelete(id);
    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post." });
  }
};

module.exports = {
  listPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
