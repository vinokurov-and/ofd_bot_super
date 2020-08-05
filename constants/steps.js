const { getLabelEnterType } = require("../utils/common");
const { nameOrg, innOrg, address } = require("./typeParams");

const KKT_ADD = [
  getLabelEnterType(nameOrg),
  getLabelEnterType(innOrg),
  getLabelEnterType(address),
];

module.exports = {
  KKT_ADD,
};
