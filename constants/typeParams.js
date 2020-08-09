const Validator = require('../services/validator');

const TYPE_PARAMS = {
  nameOrg: {
    length: 'до 128 символов',
    name: 'Наименование организации',
    validator: (value) => new Validator(value).isMaxLength(128).execute(),
  },
  innOrg: {
    length: '10 или 12 символов',
    name: 'ИНН организации',
    validator: (value) => new Validator(value).fixedLength([10, 12]).isDigit().execute(),
  },
  address: {
    length: 'до 256 символов',
    name: 'Адрес установки',
    validator: (value) => new Validator(value).isMaxLength(256).execute(),
  },
  addressLocation: {
    length: 'до 256 символов',
    name: 'Место установки ККТ',
    validator: (value) => new Validator(value).isMaxLength(256).execute(),
  },
  regId: {
    length: '16 символов',
    name: 'Регистрационный номер ККТ',
    validator: (value) => new Validator(value).fixedLength(16).execute(),
  },
};

module.exports = TYPE_PARAMS;
