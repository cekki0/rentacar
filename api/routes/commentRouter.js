const express = require("express");
const commentService = require("../service/commentService");
const userService = require("../service/userService");
const middleware = require("./middleware");

const commentRouter = express.Router();

commentRouter.post("/create", (req, res) => {
  if (commentService.createComments(req.body)){
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

commentRouter.post("/comments", (req, res) => {
  const comments = commentService.getByFacilityId(req.body.facilityId);
  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(404).json({ message: "Comments not found" });
  }
});

commentRouter.get("/allComments", (req, res) => {
  const comments = commentService.getByFacilityId(
    userService.getByUsername(req.session.username).facilityId
  );
  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(404).json({ message: "Comments not found" });
  }
});

commentRouter.get("/allCommentsAdmin", (req, res) => {
  const comments = commentService.getAll();
  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(404).json({ message: "Comments not found" });
  }
});

commentRouter.patch("/denyComment/:id", (req, res) => {
  const comment = commentService.setDeny(req.params.id);
  console.log(comment);
  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({ message: "Comments not found" });
  }
});

commentRouter.patch("/approveComment/:id", (req, res) => {
  const comment = commentService.setApprove(req.params.id);
  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({ message: "Comments not found" });
  }
});

module.exports = commentRouter;
