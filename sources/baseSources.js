module.exports = class BaseDB {
  constructor(db) {
    this.db = db;
  }

  getValue(name) {
    return this.db.then((data) => {
      return data.get(name).value();
    });
  }

  push(name, value) {
    return this.db.then((data) => {
      return data.get(name).push(value).write();
    });
  }
};
