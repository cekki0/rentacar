const express = require("express");
const commentService = require("../service/commentService");
const middleware = require("./middleware");

const commentRouter = express.Router();

commentRouter.post("/create", (req, res) => {
  if (commentService.createComments(req.body)) {
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

commentRouter.get("/comments", (req, res) => {
  const comments = commentService.getAll();
  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(404).json({ message: "Comments not found" });
  }
});

module.exports = commentRouter;
