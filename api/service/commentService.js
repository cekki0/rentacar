const commentsRepository = require("../repository/commentRepository");

function createComments(data) {
  const Comment = {
    comment: data.comment,
    rating: Number(data.rating),
    facilityId: data.facilityId,
    userId:data.userId,
    status: "pending"
  };
  commentsRepository.save(Comment);
  return true;
}

function getAll() {
  return commentsRepository.getAll();
}

function getByFacilityId(facilityId) {
  return commentsRepository
    .getAll()
    .filter((comment) => facilityId == comment.facilityId);
}

function setApprove(id) {
  const comment = commentsRepository.getById(id);
  if (comment) {
    comment.status = "Approved";
    commentsRepository.update(comment);
  }
  return comment;
}

function setDeny(id) {
  const comment = commentsRepository.getById(id);
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
