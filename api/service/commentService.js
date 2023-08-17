const commentsRepository = require("../repository/commentRepository");

function createComments(data) {
  const Comment = data;
  commentsRepository.save(Comment);
  return true;
}

function getAll() {
  return commentsRepository.getAll();
}

module.exports = { createComments, getAll };
