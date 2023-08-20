const facilityRepository = require("../repository/facilityRepository");

function validate(data) {
  return true;
}

function getAll() {
  const facilities = facilityRepository.getAll();
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const facilitiesWithOpenStatus = facilities.map((facility) => {
    const [openHours, openMinutes] = facility.startTime.split(":").map(Number);
    const [closeHours, closeMinutes] = facility.endTime.split(":").map(Number);
    
    let openStatus = "Closed";

    if (
      (currentHours > openHours || (currentHours === openHours && currentMinutes >= openMinutes)) &&
      (currentHours < closeHours || (currentHours === closeHours && currentMinutes <= closeMinutes))
    ) {
      openStatus = "Opened";
    }

    return { ...facility, openStatus };
  });

  return facilitiesWithOpenStatus;
}

function getById(id) {
  const facility = facilityRepository.getById(id);
  
  if (!facility) {
    return null;
  }

  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const [openHours, openMinutes] = facility.startTime.split(":").map(Number);
  const [closeHours, closeMinutes] = facility.endTime.split(":").map(Number);

  let openStatus = "Closed";

  if (
    (currentHours > openHours || (currentHours === openHours && currentMinutes >= openMinutes)) &&
    (currentHours < closeHours || (currentHours === closeHours && currentMinutes <= closeMinutes))
  ) {
    openStatus = "Opened";
  }

  return { ...facility, openStatus };
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

  return facilityRepository.save(Facility);
}

module.exports = {
  createFacility,
  getAll,
  getById,
};
