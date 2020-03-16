const Discord = require("discord.js");
const moment = require('moment-timezone');
const bot = new Discord.Client({ disableEveryone: true });
const ms = require("ms");
const fs = require("fs");

// Fetch config information from Heroku config vars
const token = process.env.BOT_TOKEN;
const prefix = process.env.BOT_PREFIX;
const botVersion = process.env.HEROKU_RELEASE_VERSION;      
const botReleaseUTC = process.env.HEROKU_RELEASE_CREATED_AT;

const faqChannel = '686177386542137369';
const devChannel = '639553928136228864';

// Set the bot's timezone to the server's timezone (UTC)
moment.tz.setDefault();

/* TODO: Separate the bot's replies into json files for easy editing
 *  const botResponses = ('./botResponses.json')
 *  const faqTopics = ('./faqTopics.json')
 *  ... and so on
 */

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online. Current Prefix: ${prefix}`);
  // Set bot's status as "Listening to <prefix>help"
  bot.user.setPresence({status: 'online'});
  bot.user.setActivity(`${prefix}help`, {type:'LISTENING'});
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
        // The bot will forward all queries with the <prefix>help command to the faqchannel
        if ( cmd.toLowerCase() === `${prefix}help` ) {

            // Step 1: Grab the user's message to be forwarded and garnish it with related info
            var userMessage = args.join(" ");
            const botMessageEmbed = new Discord.RichEmbed()
              .setColor('#0099ff')
              .setTitle('Mod Help Wanted!')
              .addField('Problem', userMessage)
              .addField('User in Distress', message.author.username)
              .setTimestamp()
              .setFooter('Message ID: '+message.id);
            // {
            //   color: 0x0099ff,
            //   title: 'Mod help requested!',
            //   author: {
            //     name: message.author.username,
            //     icon_url: message.author.displayAvatarURL(),
            //   },
            //   description: userMessage
            // };
            var botMessage = "Heads up! @"
                              + message.author.username + message.author.discriminator
                              +" would like some help with this:\n"
                              +"> "+userMessage;
            console.log(botMessage);

            // Step 2: send it to the faq-bot-dms channel
            const bot_faq_channel = bot.channels.get(faqChannel);
            bot_faq_channel.send(botMessageEmbed);

            // Step 3: let the user know their query is received
            message.reply("I've forwarded your query to the mods! I'll send you an answer as soon as they reply to me :)");


        }
        // Nice infobox
        else if ( cmd.toLowerCase() === `${prefix}info` ) {
            message.reply("I'm an FAQ Bot, made by Vapour38 and Blend3rman to be used on the AssistantforNMS Discord server, which can be found here: https://discord.gg/sVF32Pq"
                          +"On the server, I have a list of FAQs which can be accessed by typing their command. A list of commands can be found by typing `"+prefix+"help` on the server."
                          +"I also have a list of commands that can be used right here! By using `"+prefix+"info` right here, you can bring this message up."
                          +"By using `"+prefix+"help`, then your message, you can send a message to the mods at the AssistantforNMS asking for help. They will reply to you here."
                          +"By using `"+prefix+"suggest`, then your suggestion, you can suggest an FAQ to the mods, which they will review and possibly add to the bot. A suggestion can range from anything from a question you want answered, to a bug you have found a fix for.");
        
        }
        // Handle all non-recognized commands/msgs
        else
          message.reply("Hi there, would you like help from a human? Or would you like to suggest an FAQ or just get general info on me?"
                        +" Send me your query with `"+prefix+"help <your question>`,"
                        +" and I'll find a mod to help you out!"
                        +" If you want to suggest an FAQ or suggestion for the server, type `"+prefix+"suggest <your message>`."
                        +" Or, if you want some info on what I do, type `"+prefix+"info`.");
      }



      // These are server-wide replies, 
      // respond/react to only msgs with the prefix at the start of msg
      if( cmd.startsWith(prefix) ) {
        // Get the bot-specific emojis by name
        const questionDrone = bot.emojis.find(emoji => emoji.name === "DroneQuestion");
        const confuseDrone = bot.emojis.find(emoji => emoji.name === "DroneConfused");

        // Make the bot react to every command with the Question emoji
        message.react(questionDrone)
        .then(console.log)
        .catch(console.error);
      
        if (cmd === `${prefix}test`) {
          return message.channel.send("System test concluded. All parameters within operational limits.");
        }

        else if (cmd === `${prefix}version`) {
          if(message.channel.id === faqChannel, devChannel)  // Only reply to queries on the faq-bot-dms or developer channel
            return message.channel.send('Bot build version: '+botVersion);
        }

        else if (cmd === `${prefix}links`) {
          let links = new Discord.RichEmbed()
            .setDescription("**Links**")
            .setColor("#148AFF")
            .addField("__**Applications**__", "Website: https://nmsassistant.com\nAndroid: https://play.google.com/store/apps/details?id=com.kurtlourens.no_mans_sky_recipes\niOS: https://apps.apple.com/us/app/id1480287625\nWebApp: https://app.nmsassistant.com\nDiscord Bot: Coming Soon")
            .addField("__**Social**__", "Reddit: https://www.reddit.com/r/AssistantforNMS\nTwitter: https://twitter.com/AssistantNMS\nInstagram: https://instagram.com/AssistantNMS\nFacebook: https://facebook.com/AssistantNMS\nSteam Community Page: https://steamcommunity.com/groups/AssistantNMS\nNoMansSky Social: https://nomanssky.social/AssistantNMS");

          return message.channel.send(links);
        }

        else if (cmd === `${prefix}support`) {
          let support = new Discord.RichEmbed()
            .setDescription("**Assistant for NMS support links**")
            .setColor("#148AFF")
            .addField("__**Email**__", "You can email our support at support@nmsassistant.com, using the template found in ?supportticket")
            .addField("__**Website**__", "Our support website can be found at https://nmsassistant.freshdesk.com, or use the links in ?freshdesk and ?faq ");

          return message.channel.send(support)
              .then(msg => {
                message.channel.send("We hope to iron our all our major bugs ASAP. Let us know if you have any ideas, we’d love to hear from you!");
              });
        }

        else if (cmd === `${prefix}faq`) {
          return message.channel.send("If you can’t find the answers you’re looking for here, try checking out our full FAQ on Freshdesk: https://nmsassistant.freshdesk.com/");
        }

        else if (cmd === `${prefix}time`) {
          const sysTime = moment().toDate();
          console.log(prefix+'time was called at '+sysTime);
          // var sysZoneAbbr = sysTime.zoneAbbr();
          // return message.channel.send("Current system time: "+sysTime+" ("+sysZoneAbbr+")");
          return message.channel.send("Current system time: "+sysTime);
        }

        else if (cmd === `${prefix}supportticket`) {
          let supportticket1 = ("To log your support issue and get our team working on it, please copy the format below, fill it in with your bug information, and send it to support@nmsassistant.com to generate a support ticket.");
          let supportticket2 = new Discord.RichEmbed()
            .setDescription("**Template for a Support Ticket**")
            .setColor("#148AFF")
            .addField("__**Description**__", "- OS\n- Phone\n- App Version")
            .addField("__**Actual Behavior**__", "*Example* \n There is a delay scrolling up the list than there is scrolling down")
            .addField("__**Expected Behavior (Optional)**__", "*Example*\nI should be able to scroll back up at the same rate and responsive that I scrolled down the list")
            .addField("__**Attachments**__", "*When applicable, attach the following:*\n- Logs\n- Video\n- Screenshots");

          return message.channel.send(supportticket1)
            .then(msg => {
              message.channel.send(supportticket2);
            });
        }

        else if (cmd === `${prefix}help`) {
          let help = new Discord.RichEmbed()
            .setDescription("**List of Commands**")
            .setColor("#148AFF")
            .addField("__**?support**__", "View all of our support details, and the commands associated with them")
            .addField("__**?supportticket**__", "Find out the template to use when sending an email to our support")
            .addField("__**?systemreqs**__", "View what specs you need to use the iOS or Andriod app")
            .addField("__**?links**__", "View a list of all links related to the NMS Assistant")
            .addField("__**?translation**__", "Help with translating the app!")
            .addField("__**?faq**__", "Look for solutions to a problem you might have!")
            .addField("__**?guides**__", "Help create guides for the app!")
            .addField("__**?freshdesk**__", "Check out our support page!");

          return message.channel.send(help)
            .then(msg => {
              message.channel.send("Thank you for using Assistant for NMS!");
            })
        }

        else if (cmd === `${prefix}translation`){
          message.channel.send("If you are fluent in a language that isn't already implimented into the app, go to https://nmsassistant.com/tools/translate, or talk to @KhaozTopsy#7865 directly");
        }

        else if (cmd === `${prefix}guides`){
          message.channel.send("If you would like to contribute your knowledge of NMS towards the app, head to https://nmsassistant.com/tools/guide and create a guide for us! If approved, this will then be featured in the guides section of the app");
        }

        else if (cmd === `${prefix}freshdesk`){
          let freshdeskEmbed = new Discord.RichEmbed()
          .setDescription("**Freshdesk Site**")
          .setColor("#148AFF")
          .addField("For help with bugs, please go to the Assistant for NMS site found here:", "**Click the new support ticket button, or read the knowledge base**\nhttps://nmsassistant.freshdesk.com")

          return message.channel.send(freshdeskEmbed);
            }
        
        else {
          // If the message contained the prefix but was not a valid command, 
          // react with the corruptDrone emoji and inform of invalid command
          // Remove previous atlas message reaction
          if(args === null) return;

          const reactionList = async() => {
            const reactList = await message.reactions.cache.get(questionDrone.id);
            return reactList;
          }

          reactionList.remove()
            .catch(error => console.error('Failed to remove reactions: ', error));
           
          
          message.react(confuseDrone)
            .then(console.log)
            .catch(console.error);
          
          return message.channel.send("ERROR: Unrecognized command. Unable to assist.");
        }
      }
});

bot.login(token);
