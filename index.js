const TelegramBot = require('node-telegram-bot-api');
const redis = require('redis')
require('dotenv').config()
const client = redis.createClient()
client.connect()
const axios = require('axios')

// Personal tools
const actions = require('./actions')
const components = require('./components')
const messages = require('./utils/message')

// configs
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});
const apiToken = process.env.apiTOKEN

// Bot commands
bot.onText(/\/start/, (msg) => actions.home_menu(bot, msg.chat.id))
bot.on('callback_query', (query) => {
    const availableEngines = ['google', 'microsoft', 'faraazin']
    const availableLanguages = ['fa', 'en', 'fa_en', 'en_fa']
    const command = query.data
    const chatId = query.message.chat.id
    const messageId = query.message.message_id

    availableEngines.includes(command) ? actions.language_menu(bot, client, chatId, messageId, messages.data_list.select_language, 'engine', command, components[`${command}DestinationLanguage`]) : false
    availableLanguages.includes(command) ? actions.send_languge(bot, client, chatId, 'language', command, messages.data_list.send_text) : false

})

bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    if (!text.startsWith('/')) {
        const engine = client.get(`user:${chatId}:engine`)
        const language = client.get(`user:${chatId}:language`)

        if (engine && language) {
            const resp = await axios.get(`https://one-api.ir/translate/?token=${apiToken}&action=${engine}&lang=${language}&q=` + encodeURIComponent(text))
            let translated_text
            (engine === 'faraazin') ? translated_text = resp.data.result.base[0][1] : translated_text = resp.data.result

            bot.sendMessage(chatId, translated_text)

            client.del(`user:${chatId}:engine`)
            client.del(`user:${chatId}:language`)
        } 
        actions.home_menu(bot, chatId)
    }
})

bot.on('polling_error', (err) => console.log('polling Error => ', err))
