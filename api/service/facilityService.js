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
    startTime: data.startTime,
    endTime: data.endTime,
    location: data.location,
    logo: data.logo,
  };
  facilityRepository.save(Facility);
  return true;
}

module.exports = {
  createFacility,
  getAll,
  getById,
};
