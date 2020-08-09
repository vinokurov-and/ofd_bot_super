const { v4: uuidv4 } = require('uuid');

module.exports = class KKT {
  constructor({ nameOrg, innOrg, address, addressLocation, regId, numberKkt, numberFn }) {
    this.nameOrg = nameOrg;
    this.innOrg = innOrg;
    this.address = address;
    this.addressLocation = addressLocation;
    this.regId = regId;
    this.numberKkt = numberKkt;
    this.numberFn = numberFn;
    this.id = uuidv4();
  }

  get() {
    return this;
  }
};
