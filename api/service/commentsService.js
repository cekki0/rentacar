const commentsRepository = require("../repository/commentsRepository");

function createComments(data) {
  const Comment = {
    comment: data.comment,
  };
  commentsRepository.save(Comment);
  return true;
}

function getAll() {
  return commentsRepository.getAll();
}

module.exports = { createComments, getAll };
