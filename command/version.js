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
        response = await fetch('https://api.assistantapps.com/Version/589405b4-e40f-4cd9-b793-6bf37944ee09?platforms=0&platforms=1');
    } catch(err) {
        console.log('Could not get App version from API', err);
        return -1;
    }
    
    let data = await response.json();
    return 'Latest version: ' + data.buildName;
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
    return data;
};

exports.getCurrBotVer = getCurrBotVer;
exports.getCurrAppVer = getCurrAppVer;
exports.getCommunityLinks = getCommunityLinks;
