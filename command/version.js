const fetch = require('node-fetch');

const botVersion = process.env.HEROKU_RELEASE_VERSION;
const botReleaseUTC = process.env.HEROKU_RELEASE_CREATED_AT;

const channels = require('../constant/channels');

const getCurrBotVer = (message) => {
    if (message.channel.id === channels.faq, channels.dev)  // Only reply to queries on the faq-bot-dms or developer channel
        return message.channel.send('Bot build version: ' + botVersion
                                  + '\nRelease timestamp: '+ botReleaseUTC);
};

const getCurrAppVer = async () => {
    let response;
    try {
        response = await fetch('https://api.nmsassistant.com/version');
    } catch(err) {
        console.log('Could not get App version from API', err);
        return -1;
    }
    
    let data = await response.json();
    return data.name;
};

const getCommunityLinks = async () => {
    let response
    try {
        response = await fetch('https://api.nmsassistant.com/communityLink');
    } catch(err) {
        console.log('Could not get Community Links from API', err);
        return -1;
    }

    let data = await response.json();
    return data.name;
};

exports.getCurrBotVer = getCurrBotVer;
exports.getCurrAppVer = getCurrAppVer;
exports.getCommunityLinks = getCommunityLinks;