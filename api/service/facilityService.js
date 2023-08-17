const facilityRepository = require("../repository/facilityRepository");

function validate(data) {
  return true;
}

function getAll() {
  return facilityRepository.getAll();
}

function getById(id) {
  return facilityRepository.getById(id);
}

function getByName(name) {
  return facilityRepository.getByName(name);
}

function createFacility(data) {
  if (!validate(data)) return false;
  const Facility = {
    name: data.name,
    vehicles: [],
    startTime: data.startTime,
    endTime: data.endTime,
    openStatus: "",
    location: data.location,
    logo: data.logo,
    rating: "",
  };
  facilityRepository.save(Facility);
  return true;
}

module.exports = {
  createFacility,
  getAll,
  getById,
  getByName,
};
