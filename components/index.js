const googleDestinationLanguage = {
    reply_markup: {
        inline_keyboard: [
            [
                {text:'english', callback_data:'en'},
                {text:'persian', callback_data:'fa'},
                {text:'arabic', callback_data:'ar'},
            ]
        ]
    }
}

const microsoftDestinationLanguage = {
    reply_markup: {
        inline_keyboard: [
            [
                {text:'english', callback_data:'en'},
                {text:'persian', callback_data:'fa'},
                {text:'arabic', callback_data:'ar'},
            ]
        ]
    }
}

const farazinDestinationLanguage = {
    reply_markup: {
        inline_keyboard: [
            [
                {text:'english', callback_data:'fa_en'},
                {text:'persian', callback_data:'en_fa'},
            ]
        ]
    }
}

module.exports = {
    googleDestinationLanguage,
    microsoftDestinationLanguage,
    farazinDestinationLanguage
}