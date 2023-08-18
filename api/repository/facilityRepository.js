const Repository = require("./repository");
const vehicleRepository = require("./vehicleRepository");

const path = "./data/facilities.json";

const repository = new Repository(path);

function getAll() {
  const facilities = repository.getAll();
  const vehicles = vehicleRepository.getAll();
  for (const facility of facilities) {
    loadVehicles(facility, vehicles);
  }

  return facilities;
}

function getById(id) {
  const facility = repository.getById(id);
  if (!facility) {
    return facility;
  }
  const vehicles = vehicleRepository.getAll();
  loadVehicles(facility, vehicles);
  return facility;
}

function save(facility) {
  return repository.save(facility);
}

function update(facility) {
  repository.update(facility);
}

function remove(id) {
  return repository.remove(id);
}

function loadVehicles(facility, vehicles) {
  facility.vehicles = vehicles.filter(
    (vehicle) => vehicle.facilityId == facility.id
  );
}

module.exports = {
  getAll,
  getById,
  remove,
  save,
  update,
};
