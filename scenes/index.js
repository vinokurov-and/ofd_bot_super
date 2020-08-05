const kkt = require("./kktScene");
const { START } = require("../constants/keyboard");
const { START_COMMAND_LABEL, MENU_LABEL } = require("../constants/commands");

const main = (bot) => {
  bot.replyText({
    command: START_COMMAND_LABEL,
    response: "Привет!",
    keyboard: START,
  });

  bot.replyText({ command: MENU_LABEL, response: "Привет!", keyboard: START });

  kkt(bot);
};

module.exports = main;
