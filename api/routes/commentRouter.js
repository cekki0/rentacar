const express = require("express");
const commentsService = require("../service/commentsService");
const middleware = require("./middleware");

const commentRouter = express.Router();

commentRouter.post("/createComments", (req, res) => {
  if (commentsService.createComments(req.body)) {
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

commentRouter.get("/comments", (req, res) => {
  const comments = commentsService.getAll();
  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(404).json({ message: "comments not found" });
  }
});

module.exports = commentRouter;
