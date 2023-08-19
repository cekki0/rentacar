const orderRepository = require("../repository/orderRepository");

function validate(data) {
  return true;
}

function getAll() {
  return orderRepository.getAll();
}

function getById(id) {
  return orderRepository.getById(id);
}

module.exports = {
  getAll,
  getById,
};
