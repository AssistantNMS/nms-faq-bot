const moment = require('moment-timezone');
const channels = require('../constant/channels');
const {gAPI} = require('googleapis');
const readline = require('readline');
const Discord = require('discord.js');

const dmChannel = channels.blend3rman;

// Helper function to parse mentions in messages
function parseMentions(bot,mention) {
    if (!mention) return;

        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);

            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
            let mentionResolved = bot.users.cache.get(mention);
            return mentionResolved;
        }
}

// A user guide to the bot
const timeFnsInfo = (bot, message, prefix) => {

    let helpEmbed = new Discord.RichEmbed()
        //.setColor('#0099ff')
        .setTitle('Timezone Functionality')
        .setDescription('This is a list of commands and instructions to use the timezone features.')
        .addField('Getting Server (UTC) Time', 'To view the UTC time of the server: '
                    +`\`${prefix}time\``)
        .addField('Setting Your Timezone', 'You may set your timezone in the following ways:\n'
                    +'\t**1. By Country\/Area Name:** '
                    +`\`${prefix}time set {Country}\/{Area}\`\n`
                    +'*Example*: '+`\`${prefix}time set America\/New_York\`\n\n`
                    +'**2. By UTC Offset (recommended):** '
                    +`\`${prefix}time set UTC{+\/-}{Offset in HHMM}\`\n`
                    +'*Example*: '+`\`${prefix}time set UTC+2230\`\n`
                    +'To find your offset visit [this page](https://www.timeanddate.com/time/map/) '
                    +'and click on your region in the map.');
    message.channel.send(helpEmbed);
};

const setUserTZone = (bot, message, args) => {

    let countryCode = args[1];

};

const getUserTZone = (bot, message, args) => {

};

const currentTime = (message, prefix) => {
    const sysTime = moment().toDate();
    console.log(prefix + 'time was called at ' + sysTime);
    // var sysZoneAbbr = sysTime.zoneAbbr();
    // return message.channel.send("Current system time: "+sysTime+" ("+sysZoneAbbr+")");
    message.channel.send("Current system time: " + sysTime);
};

exports.currentTime = currentTime;
exports.getUserTZone = getUserTZone;
exports.setUserTZone = setUserTZone;
exports.timeFnsInfo = timeFnsInfo;