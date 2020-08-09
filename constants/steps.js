const { getLabelEnterType } = require('../utils/common');
const fields = require('./fields');

const enterField = (fieldName) => ({
  id: fieldName,
  field: fields[fieldName],
  label: getLabelEnterType(fields[fieldName]),
});

const KKT_ADD = [
  enterField('nameOrg'),
  // enterField('innOrg'),
  // enterField('address'),
  // enterField('addressLocation'),
  // enterField('regId'),
];

module.exports = {
  KKT_ADD,
};
