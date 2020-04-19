const Discord = require("discord.js");

const channels = require('../constant/channels');
const responses = require('../constant/responses');

const directMessage = (bot, message, args) => {
    // Step 1: Grab the user's message to be forwarded and garnish it with related info
    var userMessage = args.join(" ");
    const botMessageEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Mod Help Wanted!')
        .addField('Problem', userMessage)
        .addField('User in Distress', message.author.username)
        .setTimestamp()
        .setFooter('Message ID: ' + message.id);
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
        + " would like some help with this:\n"
        + "> " + userMessage;
    console.log(botMessage);

    // Step 2: send it to the faq-bot-dms channel
    const bot_faq_channel = bot.channels.get(channels.faq);
    bot_faq_channel.send(botMessageEmbed);

    // Step 3: let the user know their query is received
    message.reply(responses.directMessageHelp);
};


const directResponse = (bot, message, args) => {
    var modResponse = args.join(" ");
    const botResponseEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Mod Resonse Test')
        .addField('Response', modResponse)
        .addField('Mod on Duty'', message.author.username)
        .setTimestamp()
        .setFooter('Message ID: ' + message.id);
    const bot_faq_channel = bot.channels.get(channels.faq);
    bot_faq_channel.send(botResponseEmbed);
};


const listOfCommands = (message) => {
    let help = new Discord.RichEmbed()
        .setDescription("**List of Commands**")
        .setColor("#148AFF")
        .addField("__**?support**__", "View all of our support details, and the commands associated with them")
        .addField("__**?supportticket**__", "Find out the template to use when sending an email to our support")
        .addField("__**?links**__", "View a list of all links related to the NMS Assistant")
        .addField("__**?translation**__", "Help with translating the app!")
        .addField("__**?faq**__", "Look for solutions to a problem you might have!")
        .addField("__**?guides**__", "Help create guides for the app!")
        .addField("__**?freshdesk**__", "Check out our support page!");

    message.channel.send(help)
    // .then(() => {
    //     message.channel.send("Thank you for using Assistant for NMS!");
    // })
}

exports.directMessage = directMessage;
exports.directResponse = directResponse;
exports.listOfCommands = listOfCommands;
