const db = require("../db");
const kkt = require("../sources/kktSource");
const { KKT_ADD_LABEL } = require("../constants/commands");
const { KKT_ADD } = require("../constants/steps");

const kktInstance = new kkt(db);

const kktScenes = (bot) => {
  bot.replyText({
    command: KKT_ADD_LABEL,
    response: KKT_ADD[0],
    scene: "KKT_ADD",
  });
  // bot.replyText({
  //   command: KKT_ADD_LABEL,
  //   response: KKT_ADD[1],
  //   scene: "KKT_ADD",
  // });

  // bot.
  // bot.original.onText(/\/kktRead (.+)/, async (msg, match) => {
  //   const chatId = msg.chat.id;
  //   const result = await kktInstance.getKkts();
  //   bot.sendMessage(chatId, JSON.stringify(result), {});
  // });
};

module.exports = kktScenes;
