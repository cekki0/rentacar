const commentsRepository = require("../repository/commentRepository");

function createComments(data, facilityId) {
  const Comment = {};
  Comment.comment = data;
  Comment.facilityId = facilityId;
  Comment.status = "pending";
  commentsRepository.save(Comment);
  return true;
}

function getAll() {
  return commentsRepository.getAll();
}

function getByFacilityId(facilityId) {
  //komentari za odredjen id
  return commentsRepository
    .getAll()
    .filter((comment) => facilityId == comment.facilityId);
}

function setApprove(id) {
  const comment = commentsRepository.getById(id); // nadje komentar sa tim id
  console.log();
  if (comment) {
    comment.status = "Approved";
    commentsRepository.update(comment);
  }
  return comment;
}

function setDeny(id) {
  // id komentara
  const comment = commentsRepository.getById(id); // nadje komentar sa tim id
  console.log();
  if (comment) {
    comment.status = "Denied";
    commentsRepository.update(comment);
  }
  return comment;
}

module.exports = {
  createComments,
  getAll,
  getByFacilityId,
  setApprove,
  setDeny,
};
