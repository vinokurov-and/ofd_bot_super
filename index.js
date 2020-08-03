const TelegramBot = require("node-telegram-bot-api");
const Agent = require("socks5-https-client/lib/Agent");
const { TOKEN } = require("./constants/settings");
const setScenes = require("./scenes/");

const bot = new TelegramBot(TOKEN, {
  polling: true,
  request: {
    agentClass: Agent,
    agentOptions: {
      socksHost: "127.0.0.1",
      socksPort: 9150
      // If authorization is needed:
      // socksUsername: process.env.PROXY_SOCKS5_USERNAME,
      // socksPassword: process.env.PROXY_SOCKS5_PASSWORD
    }
  }
});

setScenes(bot);
