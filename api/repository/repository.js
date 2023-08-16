const fs = require("fs");
const jsonfile = require("jsonfile");

class Repository {
    constructor(path) {
        this.filePath = path;
        this.createStorage();
    }

    createStorage() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "[]", { flag: "wx" });
        }
    }

    getAll() {
        return jsonfile.readFileSync(this.filePath).filter((entity) => !entity.deleted);
    }

    getById(id) {
        return this.getAll().find((entity) => entity.id == id);
    }

    save(entity) {
        const list = jsonfile.readFileSync(this.filePath);
        entity.id = this.getNextId();
        list.push(entity);
        jsonfile.writeFileSync(this.filePath, list);
    }

    update(entity) {
        const list = jsonfile.readFileSync(this.filePath).filter((entity) => !entity.deleted);
        list.splice(
            list.findIndex((x) => x.id === entity.id),
            1,
            entity
        );

        jsonfile.writeFileSync(this.filePath, list);
    }

    remove(id) {
        const list = jsonfile.readFileSync(this.filePath).filter((entity) => !entity.deleted);
        const deletedEntity = list.splice(
            list.findIndex((x) => x.id === id),
            1
        )[0];

        deletedEntity.deleted = true;
        this.update(deletedEntity);
    }

    getNextId() {
        const list = jsonfile.readFileSync(this.filePath);
        return list === undefined ? 1 : list.length + 1;
    }
}

module.exports = Repository