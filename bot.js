const TelegramBot = require("node-telegram-bot-api");

const token = "YOUR_BOT_TOKEN";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `👋 Welcome to Over Store! 
    
Use this bot to place your orders easily. 🛍️

You can go back to the website and continue shopping!`
  );
});

module.exports = bot;
