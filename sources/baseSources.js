module.exports = class BaseDB {
  constructor(db) {
    this.db = db;
    console.log("123", db);
  }

  getValue(name) {
    return this.db.then(data => {
      return data.get(name).value();
    });
  }
};
