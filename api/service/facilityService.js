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
    vehicles: data.vehicles,
    workingTime: data.workingTime,
    openStatus: data.openStatus,
    location: data.location,
    logo: data.logo,
    rating: data.rating,
  };
  facilityRepository.save(Facility);
  return true;
}

module.exports = {
  createFacility,
  getAll,
};
