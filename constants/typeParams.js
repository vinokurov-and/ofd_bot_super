const Validator = require('../services/validator');
const ValidatorInstance = new Validator();

const TYPE_PARAMS = {
  nameOrg: {
    length: 'до 128 символов',
    name: 'Наименование организации',
    validator: ValidatorInstance.isMaxLength(128).execute,
  },
  innOrg: {
    length: '10 или 12 символов',
    name: 'ИНН организации',
    validator: ValidatorInstance.fixedLength([10, 12]).execute,
  },
  address: {
    length: 'до 256 символов',
    name: 'Адрес устрановки',
  },
};

module.exports = TYPE_PARAMS;
