const BaseDB = require("./baseSources");

class KKTSource extends BaseDB {
  constructor(params) {
    super(params);
    this.name = "kkts";
  }
  getPosts() {
    return this.getValue(this.name);
  }
}

module.exports = KKTSource;
