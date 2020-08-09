const db = require('../db');
const KKT = require('../sources/kktSource');
const {
  KKT_ADD_LABEL,
  KKT_SHOW_LABEL,
  REGISTRATION_REPORT,
  REREGISTARTION_REPORT,
  SHIFT_OPEN_REPORT,
  SHIFT_CLOSE_REPORT,
  CASHDESK_RECEIPT,
  CASHDESK_RECEIPT_CORRECTION,
} = require('../constants/commands');
const { KKT_ADD } = require('../constants/steps');
const { KKT_GENERATE_JSON_KEYBOARD, CANCEL_KEYBOARD, START_KEYBOARD } = require('../constants/keyboard');
const KKTModel = require('../model/kktModel');

const kktInstance = new KKT(db);

const kktScenes = (bot) => {
  bot.replyText({
    command: KKT_ADD_LABEL,
    response: KKT_ADD,
    scene: 'KKT_ADD',
    success: async (result) => {
      try {
        const newKkt = new KKTModel(result.data);
        await kktInstance.addKkt(newKkt);
        return 'Касса успешно добавлена';
      } catch (e) {
        return e.toString();
      }
    },
  });
  bot.replyText({
    command: KKT_SHOW_LABEL,
    response: 'Выберите одну из касс: ',
    keyboard: async () => {
      try {
        const kkts = await kktInstance.getKkts();
        const kktsKeyboard = kkts.map((kkt) => [{ text: kkt.numberKkt, callback_data: kkt.id }]);
        return kktsKeyboard;
      } catch (e) {
        return;
      }
    },
    isInlineKeyboard: true,
  });

  // реализация выбора кассы
  bot.original.on('callback_query', async ({ data, message: { chat } }) => {
    const allKkts = await kktInstance.getKkts();
    const selectKkt = allKkts.find((kkt) => kkt.id === data);
    if (selectKkt) {
      // присваиваим сцену
      bot.setScene(chat.id, 'KKT_CONTROL');
      bot.addData(chat.id, { kkt: data });
      bot.sendMessage(chat.id, `Вы выбрали кассу ${selectKkt.numberKkt}`, [
        ...KKT_GENERATE_JSON_KEYBOARD,
        ...CANCEL_KEYBOARD,
      ]);
    } else {
      bot.sendMessage(сhat.id, `Такая касса не найдена`);
    }
  });

  bot.replyText({
    command: REGISTRATION_REPORT,
    response: `Реализация генерации "${REGISTRATION_REPORT}" будет позже`,
    keyboard: START_KEYBOARD,
  });

  bot.replyText({
    command: REREGISTARTION_REPORT,
    response: `Реализация генерации "${REREGISTARTION_REPORT}" будет позже`,
    keyboard: START_KEYBOARD,
  });

  bot.replyText({
    command: SHIFT_OPEN_REPORT,
    response: `Реализация генерации "${SHIFT_OPEN_REPORT}" будет позже`,
    keyboard: START_KEYBOARD,
  });

  bot.replyText({
    command: SHIFT_CLOSE_REPORT,
    response: `Реализация генерации "${SHIFT_CLOSE_REPORT}" будет позже`,
    keyboard: START_KEYBOARD,
  });

  bot.replyText({
    command: CASHDESK_RECEIPT,
    response: `Реализация генерации "${CASHDESK_RECEIPT}" будет позже`,
    keyboard: START_KEYBOARD,
  });

  bot.replyText({
    command: CASHDESK_RECEIPT_CORRECTION,
    response: `Реализация генерации "${CASHDESK_RECEIPT_CORRECTION}" будет позже`,
    keyboard: START_KEYBOARD,
  });
};

module.exports = kktScenes;
