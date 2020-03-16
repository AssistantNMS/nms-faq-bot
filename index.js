const Discord = require("discord.js");
const moment = require('moment-timezone');
const bot = new Discord.Client({ disableEveryone: true });
const ms = require("ms");
const fs = require("fs");

const helpCommands = require('./command/help');
const infoCommands = require('./command/info');
const supportCommands = require('./command/support');
const versionCommands = require('./command/version');
const testCommands = require('./command/test');
const timeCommands = require('./command/time');

// Fetch config information from Heroku config vars
const token = process.env.BOT_TOKEN;
const prefix = process.env.BOT_PREFIX;
const botVersion = process.env.HEROKU_RELEASE_VERSION;
const botReleaseUTC = process.env.HEROKU_RELEASE_CREATED_AT;

// Set the bot's timezone to the server's timezone (UTC)
moment.tz.setDefault();

/* TODO: Separate the bot's replies into json files for easy editing
 *  const botResponses = ('./botResponses.json')
 *  const faqTopics = ('./faqTopics.json')
 *  ... and so on
 */

bot.login(token);

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online. Current Prefix: ${prefix}`);
  // Set bot's status as "Listening to <prefix>help"
  bot.user.setPresence({ status: 'online' });
  bot.user.setActivity(`${prefix}help`, { type: 'LISTENING' });
});

bot.on("message", async message => {
  if (message.author.bot) return;

  // Make the bot react to all mentions of it
  if (message.isMentioned(bot.user)) {
    const droneEye = bot.emojis.find(emoji => emoji.name === "DroneEyeBlue");
    message.react(droneEye)
      .then(console.log)
      .catch(console.error);
  }

  // Now let's handle all messages, see if we get any commands
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  // This handles all DMs to the bot user
  if (message.channel.type === "dm") {
    console.log("Direct Message");
    // The bot will forward all queries with the <prefix>help command to the faqchannel
    if (cmd.toLowerCase() === `${prefix}help`) {
      helpCommands.directMessage(bot, message, args, faqChannel);
    }
    else if (cmd.toLowerCase() === `${prefix}info`) { // Nice infobox
      infoCommands.infoResponse(message, prefix);
    }
    else // Handle all non-recognized commands/msgs
      infoCommands.defaultResponse(message, prefix);
  }

  // These are server-wide replies, 
  // respond/react to only msgs with the prefix at the start of msg
  if (cmd.startsWith(prefix)) {
    // Get the bot-specific emojis by name
    const questionDrone = bot.emojis.find(emoji => emoji.name === "DroneQuestion");
    const confuseDrone = bot.emojis.find(emoji => emoji.name === "DroneConfused");

    // Make the bot react to every command with the Question emoji
    await message.react(questionDrone);

    if (cmd === `${prefix}test`) testCommands.testMessage(message);
    else if (cmd === `${prefix}version`) versionCommands.getCurrent(message);
    else if (cmd === `${prefix}links`) infoCommands.links(message);
    else if (cmd === `${prefix}support`) supportCommands.links(message);
    else if (cmd === `${prefix}faq`) infoCommands.faq(message);
    else if (cmd === `${prefix}time`) timeCommands.currentTime(message, prefix);
    else if (cmd === `${prefix}supportticket`) supportCommands.ticket(message);
    else if (cmd === `${prefix}help`) helpCommands.listOfCommands(message);
    else if (cmd === `${prefix}translation`) infoCommands.translation(message);
    else if (cmd === `${prefix}guides`) infoCommands.guides(message);
    else if (cmd === `${prefix}freshdesk`) supportCommands.freshdesk(message);

    else {
      // If the message contained the prefix but was not a valid command, 
      // react with the corruptDrone emoji and inform of invalid command
      // Remove previous atlas message reaction

      let reactions = await message.reactions;
      for (const reaction of reactions) {
        if (!reaction[0].includes(questionDrone.id)) continue;
        reaction[1].remove();
      }
      await message.react(confuseDrone);

      return message.channel.send("ERROR: Unrecognized command. Unable to assist.");
    }
  }
});
