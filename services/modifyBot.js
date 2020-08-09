const { identicalCommands } = require('../utils/common');

const notFoundSuccess = () => {
  const NOT_FOUND_SUCCESS = 'Не найден success';
  console.error(NOT_FOUND_SUCCESS);
  return NOT_FOUND_SUCCESS;
};
const notFoundValidation = () => {
  console.log('Без валидации');
};

module.exports = class ModifiedBot {
  constructor(bot, startKeyboard, cancel, allScenes) {
    this.original = bot;
    this.startKeyboad = startKeyboard;
    this.cancelCommand = (cancel && cancel.command) || 'Отменить';
    this.cancelKeyboard = (cancel && cancel.keyboard) || [[this.cancelCommand]];

    this.users = {};

    this.allScenes = allScenes;

    bot.on('message', async (msg) => {
      const { users, original, allScenes, cancelCommand } = this;

      const chatId = msg.chat.id;
      const currentScene = users[chatId] && users[chatId].scene;
      const allSceneParams = allScenes[currentScene];

      const isCancelCommand = identicalCommands(msg.text, cancelCommand);

      if (currentScene && !isCancelCommand) {
        const { step, nextStep = step + 1, success = notFoundSuccess } = users[chatId];
        const { field: { validator } = { validator: notFoundValidation } } = allSceneParams[step];
        const validateError = validator(msg.text);

        if (validateError) {
          original.sendMessage(chatId, validateError);
        } else {
          this.users[chatId].step += 1;
          this.addData(chatId, { [allSceneParams[step].id]: msg.text });
          // продолжаем сцену, либо завершаем её если она закончилась
          if (allSceneParams[nextStep]) {
            original.sendMessage(chatId, allSceneParams[nextStep].label);
          } else {
            const result = await success(this.users[chatId]);
            this.sendMessage(chatId, result, this.startKeyboad);
            this.resetData(chatId);
          }
        }
      }

      if (isCancelCommand) {
        // нажатие кнопки отмены сцены
        this.resetData(chatId);
      }
    });

    this.replyText({
      command: this.cancelCommand,
      response: 'Действие отменено',
      keyboard: startKeyboard,
    });
  }

  setScene(chatId, scene, success, step) {
    this.users = {
      ...this.users,
      [chatId]: {
        scene,
        step,
        data: {},
        success,
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

  resetData(chatId) {
    if (this.users[chatId]) {
      delete this.users[chatId];
    }
  }

  addData(chatId, value) {
    this.users[chatId].data = { ...this.users[chatId].data, ...value };
  }

  onText(command, callback) {
    this.original.onText.call(this.original, new RegExp(command), callback);
  }

  sendMessage(chatId, text, keyboard, isInlineKeyboard) {
    this.original.sendMessage(chatId, text, {
      reply_markup: {
        [isInlineKeyboard ? 'inline_keyboard' : 'keyboard']: keyboard,
      },
    });
  }

  replyText({ command, response, keyboard = this.cancelKeyboard, scene, /*step,*/ success, isInlineKeyboard }) {
    this.onText(command, async (msg) => {
      // отвечаем чуваку на его команду
      const chatId = msg.chat.id;

      let textResponse = response;
      if (Array.isArray(response)) {
        textResponse = this.users[chatId] ? response[this.users[chatId].step].label : response[0].label;
      }
      let keyboardParam = typeof keyboard === 'function' ? await keyboard() : keyboard;
      this.sendMessage(chatId, textResponse, keyboardParam, isInlineKeyboard);

      // устанавливаем сцену для юзера если она есть
      scene && this.setScene(chatId, scene, success, 0);
      // step && this.setStep(chatId, step);
    });
  }
};
