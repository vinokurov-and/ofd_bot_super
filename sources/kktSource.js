const BaseDB = require("./baseSources");

class KKTSource extends BaseDB {
  constructor(params) {
    super(params);
    this.name = "kkts";
  }
  getKkts() {
    return this.getValue(this.name);
  }
  addKkt(kktModel) {
    console.log(kktModel);
  }
}

module.exports = KKTSource;
