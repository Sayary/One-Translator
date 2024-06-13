const home_menu = (bot, chatId) => {
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard:[
                [
                    {text:'microsoft engine (🇺🇸)', callback_data:'microsoft'},
                    {text:'google engine (🇺🇸)', callback_data:'google'}
                ],
                [
                    {text:'farazin engine (🇮🇷)', callback_data:'farazin'}
                ]
            ]
        }
    }
    bot.sendMessage(chatId, 'welcome to translator\nplease choose translator engine', inlineKeyboard)
}

const language_menu = (bot, client, chatId, messageId, textMessage, field, command, inlineKeyboard) => {
    client.set(`user:${chatId}:${field}`, command)
    bot.editMessageText(textMessage, {
        chat_id:chatId,
        message_id: messageId,
        reply_markup: inlineKeyboard.reply_markup
    })
}

module.exports = {
    home_menu,
    language_menu
}