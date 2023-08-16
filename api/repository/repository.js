const fs = require("fs");
const jsonfile = require("jsonfile");

let filePath = "";

function changePath(path) {
  filePath = path;
}

function createStorage() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", { flag: "wx" });
  }
}

function getAll() {
  return jsonfile.readFileSync(filePath).filter((entity) => !entity.deleted);
}

function getById(id) {
  return this.getAll().find((entity) => entity.id == id);
}

function save(entity) {
  const list = jsonfile.readFileSync(filePath);
  entity.id = getNextId();
  list.push(entity);
  jsonfile.writeFileSync(filePath, list);
}

function update(entity) {
  const list = jsonfile
    .readFileSync(filePath)
    .filter((entity) => !entity.deleted);
  list.splice(
    list.findIndex((x) => x.id === entity.id),
    1,
    entity
  );

  jsonfile.writeFileSync(filePath, list);
}

function remove(id) {
  const list = jsonfile
    .readFileSync(filePath)
    .filter((entity) => !entity.deleted);
  const deletedEntity = list.splice(
    list.findIndex((x) => x.id === id),
    1
  )[0];

  deletedEntity.deleted = true;
  this.update(deletedEntity);
}

function getNextId() {
  const list = jsonfile.readFileSync(filePath);
  return list === undefined ? 1 : list.length + 1;
}

module.exports = {
  changePath,
  createStorage,
  getAll,
  getById,
  save,
  remove,
  update,
};
