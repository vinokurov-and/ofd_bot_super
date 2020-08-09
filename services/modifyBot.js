module.exports = class ModifiedBot {
  constructor(bot, startKeyboard, cancel, allScenes) {
    this.original = bot;
    this.startKeyboad = startKeyboard;
    this.cancelCommand = (cancel && cancel.command) || 'Отменить';
    this.cancelKeyboard = (cancel && cancel.keyboard) || [[this.cancelCommand]];

    this.users = {};

    this.allScenes = allScenes;

    bot.on('message', (msg) => {
      const { users, original, allScenes } = this;
      const chatId = msg.chat.id;

      if (
        users[chatId] &&
        users[chatId].scene &&
        msg.text.toString().toLowerCase().indexOf(this.cancelCommand.toLowerCase()) !== 0
      ) {
        const { step, scene, nextStep = step + 1 } = users[chatId];
        console.log(users[chatId]);
        console.log(allScenes[scene][step]);
        const validateError = allScenes[scene][step].validate && allScenes[scene][step].validate(msg.text);
        if (validateError) {
          original.sendMessage(chatId, validateError);
        } else {
          this.users[chatId].step += 1;
          original.sendMessage(chatId, allScenes[users[chatId].scene][nextStep].label);
        }
      }
    });
    console.log('123312312');
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
    console.log('AAAAAAAAAAAAAAAAAA');
    this.users = {
      ...this.users,
      [chatId]: {
        ...this.users[chatId],
        step,
      },
    };
    console.log('BBBBBBBBBBBBBB');
    console.log(this.users);
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
