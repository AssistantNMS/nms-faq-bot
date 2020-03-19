const moment = require('moment-timezone');
const channels = require('./constant/channels');
// Helper function to parse mentions in messages
function parseMentions(bot,mention) {
    if (!mention) return;

        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);

            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
            let mentionResolved = await bot.users.cache.get(mention);
            return mentionResolved;
        }
    }

function setUserTZone(){
    
}

const currentTime = (message, prefix) => {
    const sysTime = moment().toDate();
    console.log(prefix + 'time was called at ' + sysTime);
    // var sysZoneAbbr = sysTime.zoneAbbr();
    // return message.channel.send("Current system time: "+sysTime+" ("+sysZoneAbbr+")");
    message.channel.send("Current system time: " + sysTime);
};
const setTZone = (bot, message, prefix) => {

};
exports.currentTime = currentTime;