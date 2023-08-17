const Repository = require("./repository");
const facilityRepository = require("./facilityRepository");

const path = "./data/users.json";

const repository = new Repository(path);

function getAll() {
  const users = repository.getAll();
  for (const user of users) {
    if (user.role === "manager") {
      user.facility = facilityRepository.getById(user.facilityId);
    }
  }

  return users;
}

function getById(id) {
  const user = repository.getById(id);

  if (user.role === "manager")
    user.facility = facilityRepository.getById(user.facilityId);

  return user;
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
  const user = getAll().find((user) => user.username == username);

  if (user.role === "manager")
    user.facility = facilityRepository.getById(user.facilityId);

  return user;
}

function getByEmail(email) {
  const user = getAll().find((user) => user.email == email);
  if (user.role === "manager")
    user.facility = facilityRepository.getById(user.facilityId);

  return user;
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
