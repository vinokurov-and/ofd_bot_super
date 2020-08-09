const { getLabelEnterType } = require('../utils/common');
const { nameOrg, innOrg, address } = require('./typeParams');

const KKT_ADD = [
  {
    field: nameOrg,
    label: getLabelEnterType(nameOrg),
  },
  { field: innOrg, label: getLabelEnterType(innOrg) },
  { field: address, label: getLabelEnterType(address) },
];

module.exports = {
  KKT_ADD,
};
