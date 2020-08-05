const {
  KKT_ADD_LABEL,
  MENU_LABEL,
  CANCEL_LABEL,
} = require("../constants/commands");

const START = [[KKT_ADD_LABEL], [MENU_LABEL]];
const CANCEL_KEYBOARD = [[CANCEL_LABEL]];

module.exports = {
  START_KEYBOARD: START,
  START,
  CANCEL_KEYBOARD,
};
