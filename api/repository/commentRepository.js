const Repository = require("./repository");

const path = "./data/comments.json";

const repository = new Repository(path);

function getAll() {
  return repository.getAll();
}

function getById(id) {
  return repository.getById(id);
}

function save(comment) {
  return repository.save(comment);
}

function update(comment) {
  repository.update(comment);
}

function remove(id) {
  return repository.remove(id);
}

module.exports = {
  getAll,
  getById,
  remove,
  save,
  update,
};
