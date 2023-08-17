const express = require("express");
const facilityService = require("../service/facilityService");
const userService = require("../service/userService");
const middleware = require("./middleware");

const facilityRouter = express.Router();

facilityRouter.post("/create", (req, res) => {
  const facility = facilityService.createFacility(req.body.facility);
  if (facility) {
    userService.setManagerFacility(req.body.selectedManager.id, facility.id);
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

facilityRouter.get("/facilities", (req, res) => {
  const facilities = facilityService.getAll();
  if (facilities) {
    res.status(200).json(facilities);
  } else {
    res.status(404).json({ message: "Facilities not found" });
  }
});

facilityRouter.get("/facility/:id", (req, res) => {
  const id = req.params.id;
  const facility = facilityService.getById(id);
  if (facility) {
    res.status(200).json(facility);
  } else {
    res.status(404).json({ message: "Facility not found" });
  }
});

module.exports = facilityRouter;
