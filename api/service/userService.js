const userRepository = require("../repository/userRepository");

function validate(data) {
  if (!data.username) {
    return false;
  }
  if (!data.password) {
    return false;
  }

  if (!data.firstName) {
    return false;
  }

  if (!data.lastName) {
    return false;
  }

  if (!data.gender) {
    return false;
  }

  if (!data.dateOfBirth) {
    return false;
  }

  return true;
}

function loginValidation(data) {
  if (!data.username) {
    return false;
  }
  if (!data.password) {
    return false;
  }
  return true;
}

function getByUsername(username) {
  return userRepository.getByUsername(username);
}

function updateUser(user) {
  return userRepository.update(user);
}

function loginUser(data) {
  if (!loginValidation(data)) return false;
  if (
    userRepository
      .getAll()
      .find(
        (user) =>
          user.username == data.username && user.password == data.password
      )
  ) {
    return true;
  }
}

function createCustomer(data) {
  if (!validate(data)) return false;

  const Customer = {
    username: data.username,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    role: "customer",
    points: 0,
  };
  userRepository.save(Customer);
  return true;
}

module.exports = { createCustomer, loginUser, getByUsername, updateUser };
