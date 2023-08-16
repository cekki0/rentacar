const express = require("express");
const userService = require("../service/userService");
const middleware = require("./middleware");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  if (userService.createCustomer(req.body)) {
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

userRouter.post("/login", (req, res) => {
  if (userService.loginUser(req.body)) {
    req.session.username = req.body.username;
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

userRouter.get("/logout", middleware.isAuthenticated, (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

userRouter.get("/profile/", middleware.isAuthenticated, (req, res) => {
  const username = req.session.username;
  const user = userService.getByUsername(username);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

userRouter.patch("/profile/edit/", middleware.isAuthenticated, (req, res) => {
  const username = req.session.username;
  const updatedUserData = req.body;

  const user = userService.getByUsername(username);

  if (user) {
    Object.assign(user, updatedUserData);
    userService.updateUser(user);
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

userRouter.patch(
  "/profile/changePassword/",
  middleware.isAuthenticated,
  (req, res) => {
    const username = req.session.username;
    const updatedUserData = req.body;

    const user = userService.getByUsername(username);

    if (user) {
      Object.assign(user, updatedUserData);
      userService.updateUser(user);
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
);

userRouter.get("/loginCheck", (req, res) => {
  if (req.session && req.session.username) res.send(true);
  else return res.send(false);
});

module.exports = userRouter;
