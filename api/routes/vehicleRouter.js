const express = require("express");
const vehicleService = require("../service/vehicleService");
const middleware = require("./middleware");

const vehicleRouter = express.Router();

vehicleRouter.get("/vehicles", (req, res) => {
  const vehicles = vehicleService.getAll();
  if (vehicles) {
    res.status(200).json(vehicles);
  } else {
    res.status(404).json({ message: "Vehicles not found" });
  }
});

vehicleRouter.post("/create", (req, res) => {
  if (vehicleService.createVehicle(req.body)) {
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

vehicleRouter.patch("/edit/:id", (req, res) => {
  const id = req.params.id;
  const updatedVehicle = req.body;

  const vehicle = vehicleService.getById(id);

  if (vehicle) {
    Object.assign(vehicle, updatedVehicle);
    vehicleService.updateVehicle(vehicle);
    res.status(200).json(vehicle);
  } else {
    res.status(404).json({ message: "Vehicle not found" });
  }
});

vehicleRouter.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  try {
    vehicleService.deleteVehicle(id);
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vehicle" });
  }
});

module.exports = vehicleRouter;
