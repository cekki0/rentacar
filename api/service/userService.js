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

function getAll() {
  return userRepository.getAll();
}

function getByUsername(username) {
  return userRepository.getByUsername(username);
}

function updateUser(user) {
  userRepository.update(user);
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

function createManager(data) {
  if (!validate(data)) return false;

  const Customer = {
    username: data.username,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    role: "manager",
    points: 0,
  };
  userRepository.save(Customer);
  return true;
}

function getAllManagers() {
  return userRepository.getAll().filter((user) => user.role == "manager");
}

function setManagerFacility(managerId, facilityId) {
  console.log(managerId, facilityId);
  for (const user of userRepository.getAll()) {
    if (user.id == managerId) {
      user.facilityId = facilityId;
      userRepository.update(user);
    }
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

module.exports = {
  createCustomer,
  loginUser,
  getByUsername,
  updateUser,
  createManager,
  getAllManagers,
  getAll,
  setManagerFacility,
};
