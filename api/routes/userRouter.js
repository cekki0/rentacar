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

userRouter.post("/registerManager", (req, res) => {
  if (userService.createManager(req.body)) {
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

userRouter.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const user = userService.getById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

userRouter.get("/users", (req, res) => {
  const users = userService.getAll();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Users not found" });
  }
});

userRouter.get("/managers", (req, res) => {
  const managers = userService.getAllManagers();
  if (managers) {
    res.status(200).json(managers);
  } else {
    res.status(404).json({ message: "Managers not found" });
  }
});

userRouter.patch("/profile/edit/", middleware.isAuthenticated, (req, res) => {
  const username = req.session.username;
  const updatedUserData = req.body;

  const user = userService.getByUsername(username);
  user.facility = {};

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
