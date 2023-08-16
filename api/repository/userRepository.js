const repository = require("./repository");

const path = "./data/users.json";

repository.changePath(path);
repository.createStorage();

function getAll() {
  return repository.getAll();
}

function getById(id) {
  return repository.getById(id);
}

function save(user) {
  return repository.save(user);
}

function update(user) {
  repository.update(user);
}

function remove(id) {
  return repository.remove(id);
}

function getByUsername(username) {
  return getAll().find((user) => user.username == username);
}

function getByEmail(email) {
  return getAll().find((user) => user.email == email);
}

module.exports = {
  getAll,
  getByEmail,
  getById,
  getByUsername,
  remove,
  save,
  update,
};
