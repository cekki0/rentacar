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
  const comment = commentsRepository.getById(id);
  comment.status = "Approved";
  commentsRepository.save(comment);
}

function setDeny(id) {
  const comment = commentsRepository.getById(id);
  comment.status = "Denyed";
  commentsRepository.save(comment);
}

module.exports = {
  createComments,
  getAll,
  getByFacilityId,
  setApprove,
  setDeny,
};
