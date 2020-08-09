const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
const ModifiedBot = require('./services/modifyBot');
const { TOKEN } = require('./constants/settings');
const { CANCEL_LABEL } = require('./constants/commands');
const { START_KEYBOARD, CANCEL_KEYBOARD } = require('./constants/keyboard');
const setScenes = require('./scenes/');
const stepsScenes = require('./constants/steps');

const bot = new TelegramBot(TOKEN, {
  polling: true,
  request: {
    agentClass: Agent,
    agentOptions: {
      socksHost: '127.0.0.1',
      socksPort: 9150,
      // If authorization is needed:
      // socksUsername: process.env.PROXY_SOCKS5_USERNAME,
      // socksPassword: process.env.PROXY_SOCKS5_PASSWORD
    },
  },
});

const modifiedBot = new ModifiedBot(
  bot,
  START_KEYBOARD,
  {
    keyboard: CANCEL_KEYBOARD,
    command: CANCEL_LABEL,
  },
  stepsScenes
);

setScenes(modifiedBot);
