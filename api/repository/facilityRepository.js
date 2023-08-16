const Repository = require("./repository");

const path = "./data/facilities.json";

const repository = new Repository(path);

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

module.exports = {
    getAll,
    getById,
    remove,
    save,
    update,
};
