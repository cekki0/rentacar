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

  return facilityRepository.save(Facility);
}

module.exports = {
  createFacility,
  getAll,
  getById,
};
