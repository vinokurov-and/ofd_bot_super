const { identicalCommands } = require('../utils/common');

module.exports = class ModifiedBot {
  constructor(bot, startKeyboard, cancel, allScenes) {
    this.original = bot;
    this.startKeyboad = startKeyboard;
    this.cancelCommand = (cancel && cancel.command) || 'Отменить';
    this.cancelKeyboard = (cancel && cancel.keyboard) || [[this.cancelCommand]];

    this.users = {};

    this.allScenes = allScenes;

    bot.on('message', (msg) => {
      const { users, original, allScenes, cancelCommand } = this;

      const chatId = msg.chat.id;
      const currentScene = users[chatId] && users[chatId].scene;
      const sceneParams = allScenes[currentScene];

      if (currentScene && !identicalCommands(msg.text, cancelCommand)) {
        const { step, nextStep = step + 1 } = users[chatId];
        const validateError = sceneParams[step].field.validator && sceneParams[step].field.validator(msg.text);
        console.log(validateError)
        if (validateError) {
          original.sendMessage(chatId, validateError);
        } else {
          this.users[chatId].step += 1;
          original.sendMessage(chatId, sceneParams[nextStep].label);
        }
      }
    });
    this.replyText({
      command: this.cancelCommand,
      response: 'Действие отменено',
      keyboard: startKeyboard,
    });
  }

  setScene(chatId, scene, step = 0) {
    this.users = {
      ...this.users,
      [chatId]: {
        scene,
        step,
      },
    };
  }

  setStep(chatId, step) {
    this.users = {
      ...this.users,
      [chatId]: {
        ...this.users[chatId],
        step,
      },
    };
  }

  onText(command, callback) {
    this.original.onText.call(this.original, new RegExp(command), callback);
  }

  replyText({ command, response, keyboard = this.cancelKeyboard, scene, step }) {
    this.onText(command, async (msg) => {
      // отвечаем чуваку на его команду
      const chatId = msg.chat.id;

      let textResponse = response;
      console.log(response);
      if (Array.isArray(response)) {
        textResponse = this.users[chatId] ? response[this.users[chatId].step].label : response[0].label;
      }
      this.original.sendMessage(chatId, textResponse, {
        reply_markup: {
          keyboard,
        },
      });

      // устанавливаем сцену для юзера если она есть
      scene && this.setScene(chatId, scene);
      step && this.setStep(chatId, step);
    });
  }
};
