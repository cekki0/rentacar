const facilityRepository = require("../repository/facilityRepository");
const commentRepository = require("../repository/commentRepository");

function validate(data) {
  return true;
}

function getAll() {
  const facilities = facilityRepository.getAll();
  const comments = commentRepository.getAll();
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const facilitiesWithOpenStatus = facilities.map((facility) => {
    const [openHours, openMinutes] = facility.startTime.split(":").map(Number);
    const [closeHours, closeMinutes] = facility.endTime.split(":").map(Number);
    let rating=0;
    let sumOfRatings = 0;
    let counter =0;
    
    for (const comment of comments) {
      if(facility.id == comment.facilityId && comment.status=="Approved")
      {
        sumOfRatings+=comment.rating;
        counter++;
      }
    }
    if(sumOfRatings)
    {
      rating = sumOfRatings/counter
    }

    let openStatus = "Closed";

    if (
      (currentHours > openHours || (currentHours === openHours && currentMinutes >= openMinutes)) &&
      (currentHours < closeHours || (currentHours === closeHours && currentMinutes <= closeMinutes))
    ) {
      openStatus = "Opened";
    }

    return { ...facility, openStatus,rating };
  });

  return facilitiesWithOpenStatus;
}

function getById(id) {
  const facility = facilityRepository.getById(id);
  const comments = commentRepository.getAll();
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const [openHours, openMinutes] = facility.startTime.split(":").map(Number);
  const [closeHours, closeMinutes] = facility.endTime.split(":").map(Number);

  let rating=0;
    let sumOfRatings = 0;
    let counter =0;
    
    for (const comment of comments) {
      if(facility.id == comment.facilityId && comment.status=="Approved")
      {
        sumOfRatings+=comment.rating;
        counter++;
      }
    }
    if(sumOfRatings)
    {
      rating = sumOfRatings/counter
    }

  let openStatus = "Closed";

  if (
    (currentHours > openHours || (currentHours === openHours && currentMinutes >= openMinutes)) &&
    (currentHours < closeHours || (currentHours === closeHours && currentMinutes <= closeMinutes))
  ) {
    openStatus = "Opened";
  }

  return { ...facility, openStatus,rating };
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
