const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config();
const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', async (msg) => {
    const text = msg.text;
    console.log("Message received: ", text);
    bot.sendMessage(msg.chat.id, "You said: " + text);
})
bot.onText(/\/ai/, async (msg) => {
    console.log(msg.text)
    bot.sendMessage(msg.chat.id, await generateData(msg.text));

})
async function generateData(prompt){
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
}