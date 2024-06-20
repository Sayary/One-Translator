require('dotenv').config()

const home_menu = (bot, chatId) => {
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard:[
                [
                    {text:'microsoft engine (🇺🇸)', callback_data:'microsoft'},
                    {text:'google engine (🇺🇸)', callback_data:'google'}
                ],
                [
                    {text:'farazin engine (🇮🇷)', callback_data:'faraazin'}
                ]
            ]
        }
    }
    bot.sendMessage(chatId, 'welcome to translator\nplease choose translator engine', inlineKeyboard)
}

const language_menu = (bot, client, chatId, messageId, textMessage, field, command, inlineKeyboard) => {
    client.set(`user:${chatId}:${field}`, command, {
        EX: process.env.TIMER
    })
    bot.editMessageText(textMessage, {
        chat_id:chatId,
        message_id: messageId,
        reply_markup: inlineKeyboard.reply_markup
    })
}

const send_languge = (bot, client, chatId, field, language, textMessage) => {
    client.set(`user:${chatId}:${field}`, language, {
        EX: process.env.TIMER
    })
    bot.sendMessage(chatId, textMessage)
}

module.exports = {
    home_menu,
    language_menu,
    send_languge
}