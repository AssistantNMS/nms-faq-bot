
const channels = require('../constant/channels');


const getCurrent = (message) => {
    if (message.channel.id === channels.faq, channels.dev)  // Only reply to queries on the faq-bot-dms or developer channel
        return message.channel.send('Bot build version: ' + botVersion);
};

exports.getCurrent = getCurrent;