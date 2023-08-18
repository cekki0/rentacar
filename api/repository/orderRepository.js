const Repository = require("./repository");

const path = "./data/orders.json";

const repository = new Repository(path);

function getAll() {
  return repository.getAll();
}

function getById(id) {
  return repository.getById(id);
}

function save(order) {
  return repository.save(order);
}

function update(order) {
  repository.update(order);
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
