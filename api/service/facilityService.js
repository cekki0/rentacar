const facilityRepository = require("../repository/facilityRepository");

function validate(data) {
  return true;
}

function getAll() {
  return facilityRepository.getAll();
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
    logo: "",
    rating: "",
  };
  facilityRepository.save(Facility);
  return true;
}

module.exports = {
  createFacility,
  getAll,
};
