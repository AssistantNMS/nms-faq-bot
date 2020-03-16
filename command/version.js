
const channels = require('../constant/channels');

const botVersion = process.env.HEROKU_RELEASE_VERSION;
const botReleaseUTC = process.env.HEROKU_RELEASE_CREATED_AT;

const getCurrent = (message) => {
    if (message.channel.id === channels.faq, channels.dev)  // Only reply to queries on the faq-bot-dms or developer channel
        return message.channel.send('Bot build version: ' + botVersion 
                                    +'\nRelease timestamp: '+ botReleaseUTC);
};

exports.getCurrent = getCurrent;