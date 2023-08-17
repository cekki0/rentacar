const vehicleRepository = require("../repository/vehicleRepository");

function validate(data) {
  return true;
}

function getAll() {
  return vehicleRepository.getAll();
}

function getById(id) {
  return vehicleRepository.getById(id);
}

function createVehicle(data) {
  if (!validate(data)) return false;
  const Vehicle = data;
  Vehicle.rentStatus = "available";
  Vehicle.deleted = false;
  vehicleRepository.save(Vehicle);
  return true;
}

function updateVehicle(vehicle) {
  vehicleRepository.update(vehicle);
}

function deleteVehicle(id) {
  vehicleRepository.remove(id);
}

module.exports = {
  createVehicle,
  getAll,
  updateVehicle,
  getById,
  deleteVehicle,
};
