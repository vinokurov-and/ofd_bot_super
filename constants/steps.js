const { getLabelEnterType } = require('../utils/common');
const { nameOrg, innOrg, address, regId, addressLocation } = require('./typeParams');

const enterField = (field) => ({ field, label: getLabelEnterType(field) });

const KKT_ADD = [
  enterField(nameOrg),
  enterField(innOrg),
  enterField(address),
  enterField(addressLocation),
  enterField(regId),
];

module.exports = {
  KKT_ADD,
};
