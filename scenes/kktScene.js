const db = require("../db");
const kkt = require("../sources/kktSource");

console.log("1", db);
const kktInstance = new kkt(db);

const kktScenes = bot => {
  bot.onText(/\/kktAdd (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    console.log(msg);
    bot.sendMessage(chatId, resp);
  });

  bot.onText(/\/kktRead (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const result = await kktInstance.getPosts();
    bot.sendMessage(chatId, JSON.stringify(result));
  });
};

module.exports = kktScenes;
