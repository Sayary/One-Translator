const TelegramBot = require('node-telegram-bot-api');
const redis = require('redis')
const client = redis.createClient()
client.connect()

// Personal tools
const actions = require('./actions')
const components = require('./components')
const messages = require('./utils/message')

// configs
const token = '7370233482:AAGPRK0tcdbOAvRAlcbDralsWz5jksKidWM';
const bot = new TelegramBot(token, {polling: true});


// Bot commands
bot.onText(/\/start/, (msg) => actions.home_menu(bot, msg.chat.id))
bot.on('callback_query', (query) => {
    const command = query.data
    const chatId = query.message.chat.id
    const messageId = query.message.message_id
    switch (command) {
        case 'google':
            actions.language_menu(bot, client, chatId, messageId, messages.data_list.select_language, 'engine', command, components.googleDestinationLanguage)
            break
        case 'microsoft':
            actions.language_menu(bot, client, chatId, messageId, messages.data_list.select_language, 'engine', command, components.microsoftDestinationLanguage)
            break
        case 'farazin':
            actions.language_menu(bot, client, chatId, messageId, messages.data_list.select_language, 'engine', command, components.farazinDestinationLanguage)
            break
    }
})
