const express = require("express");
const morgan = require("morgan");
const commentsRouter = require("./routes/comments.routes");
const postsRouter = require("./routes/posts.route");
const usersRouter = require("./routes/users.route");

const app = express();

// Middleware for logging requests
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/comments", commentsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

app.get("/health", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = { app };
