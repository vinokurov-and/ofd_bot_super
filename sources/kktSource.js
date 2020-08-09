const BaseDB = require('./baseSources');

class KKTSource extends BaseDB {
  constructor(params) {
    super(params);
    this.name = 'kkts';
  }
  getKkts() {
    return this.getValue(this.name);
  }
  addKkt(KKTModel) {
    return this.push(this.name, KKTModel);
  }
}

module.exports = KKTSource;
