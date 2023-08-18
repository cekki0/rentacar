const express = require("express");
const orderService = require("../service/orderService");
const middleware = require("./middleware");

const orderRouter = express.Router();

orderRouter.get("/orders", (req, res) => {
  const orders = orderService.getAll();
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({ message: "Orders not found" });
  }
});

module.exports = orderRouter;
