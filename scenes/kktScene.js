const db = require('../db');
const kkt = require('../sources/kktSource');
const { KKT_ADD_LABEL } = require('../constants/commands');
const { KKT_ADD } = require('../constants/steps');

const kktInstance = new kkt(db);

const kktScenes = (bot) => {
  bot.replyText({
    command: KKT_ADD_LABEL,
    response: KKT_ADD,
    scene: 'KKT_ADD',
    success: (data) => {
      console.log('конец', data);
      return 'Касса успешно добавлена';
    },
  });
  // bot.replyText({})
};

module.exports = kktScenes;
