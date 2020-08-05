module.exports = class ModifiedBot {
  constructor(bot, startKeyboard, cancel) {
    this.original = bot
    this.startKeyboad = startKeyboard
    this.cancelCommand = (cancel && cancel.command) || 'Отменить'
    this.cancelKeyboard = (cancel && cancel.keyboard) || [[this.cancelCommand]]
    this.users = {}

    bot.on('message', (msg) => {
      const { users } = this
      const chatId = msg.chat.id
      if (
        users[chatId] &&
        users[chatId].scene &&
        msg.text.toString().toLowerCase().indexOf(this.cancelCommand.toLowerCase()) !== 0
      ) {
        users[chatId] && users[chatId].scene && users[chatId].validate(msg.text)
      }
    })

    this.replyText({
      command: this.cancelCommand,
      response: 'Действие отменено',
      keyboard: startKeyboard,
    })
  }

  setScene = (chatId, scene, validate = (value) => console.log(value), step = 0) => {
    this.users = {
      ...this.users,
      [chatId]: {
        scene,
        step,
        validate,
      },
    }
  }

  setStep = (chatId, step) => {
    this.users = {
      ...this.users,
      [chatId]: {
        scene: this.users.typeScene,
        step,
        validate: this.users.validate,
      },
    }
  }

  onText = (command, callback) => {
    this.original.onText.call(this.original, new RegExp(command), callback)
  }

  replyText = ({ command, response, keyboard = this.cancelKeyboard, scene, step }) => {
    this.onText(command, async (msg) => {
      // отвечаем чуваку на его команду
      const chatId = msg.chat.id
      this.original.sendMessage(chatId, response, {
        reply_markup: {
          keyboard,
        },
      })

      // устанавливаем сцену для юзера если она есть
      scene && this.setScene(chatId, scene)
      step && this.setStep(chatId, step)
    })
  }
}
