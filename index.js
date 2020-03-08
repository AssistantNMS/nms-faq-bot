const token = process.env.BOT_TOKEN;
const prefix = process.env.BOT_PREFIX;
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const ms = require("ms");
const fs = require("fs");


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online and protecting ${bot.guilds.size} servers!`);
  bot.user.setPresence({ status: 'online', game: { name: '?help for info' }});
  });

  bot.on("message", async message => {
      if (message.author.bot) return;
      if (message.isMentioned(bot.user)) {
         message.reply("Hello! I am an FAQ Bot, type ?help for more info");
  }
  });

  bot.on('message', async message => {
    if(message.channel.DMChannel) {
       if(message.content.toLowerCase() == 'help') {
          console.log('User ' + member.user.username + ' is requesting assitance. Now alerting staff members!');
          bot.channels.get("686177386542137369").send('**' + member.user.username + '**, is requesting staff assitance. Now alerting staff members!')
          bot.sendMessage('I helped you! A staff member will respond soon!');
       } else {
           bot.sendMessage('You can only ask for help by DM, please type "help" if you need assistance!');
       }
      }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}test`) {
    return message.channel.send("This is a test. I repeat, this is a test.");
  }

  if (cmd === `${prefix}links`) {
    let links = new Discord.RichEmbed()
      .setDescription("**Links**")
      .setColor("#148AFF")
      .addField("__**Applications**__", "Website: https://nmsassistant.com\nAndroid: https://play.google.com/store/apps/details?id=com.kurtlourens.no_mans_sky_recipes\niOS: https://apps.apple.com/us/app/id1480287625\nWebApp: https://app.nmsassistant.com\nDiscord Bot: Coming Soon")
      .addField("__**Social**__", "Reddit: https://www.reddit.com/r/AssistantforNMS\nTwitter: https://twitter.com/AssistantNMS\nInstagram: https://instagram.com/AssistantNMS\nFacebook: https://facebook.com/AssistantNMS\nSteam Community Page: https://steamcommunity.com/groups/AssistantNMS\nNoMansSky Social: https://nomanssky.social/AssistantNMS");

 return message.channel.send(links);
    }

  if (cmd === `${prefix}support`) {
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

  if (cmd === `${prefix}faq`) {
    return message.channel.send("If you can’t find the answers you’re looking for here, try checking out our full FAQ on Freshdesk: https://nmsassistant.freshdesk.com/");
  }

  if (cmd === `${prefix}systemreqs`) {
    let systemreq = new Discord.RichEmbed()
      .setDescription("**System Requirements**")
      .setColor("#148AFF")
      .addField("__**OS REQUIREMENTS**__", "****")
      .addField("__**PHONE REQUIREMENTS**__", " ****")
      .addField("__**CONNECTIVITY**__", "**Working Internet Connection**");

    return message.channel.send(systemreq);
  }

  if (cmd === `${prefix}supportticket`) {
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

  if (cmd === `${prefix}help`) {
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
  };

  if (cmd === `${prefix}translation`){
    message.channel.send("If you are fluent in a language that isn't already implimented into the app, go to https://nmsassistant.com/tools/translate, or talk to @KhaozTopsy#7865 directly");
  }

  if (cmd === `${prefix}guides`){
    message.channel.send("If you would like to contribute your knowledge of NMS towards the app, head to https://nmsassistant.com/tools/guide and create a guide for us! If approved, this will then be featured in the guides section of the app");
  }

  if (cmd === `${prefix}freshdesk`){
    let freshdeskEmbed = new Discord.RichEmbed()
    .setDescription("**Freshdesk Site**")
    .setColor("#148AFF")
    .addField("For help with bugs, please go to the Assistant for NMS site found here:", "**Click the new support ticket button, or read the knowledge base**\nhttps://nmsassistant.freshdesk.com")

    return message.channel.send(freshdeskEmbed);
      }
});

bot.login(token);
