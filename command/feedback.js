const Discord = require("discord.js");

const channels = require('../constant/channels');
const responses = require('../constant/responses');

const directMessageFeedback = (bot, message, args) => {
    // Step 1: Grab the user's message to be forwarded and garnish it with related info
    var userFeedback = args.join(" ");
    const botMessageEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Feedback Recieved!')
        .addField('Feedback', userFeedback)
        .addField('User', message.author.username)
        .setTimestamp()
        .setFooter('Message ID: ' + message.id);
    // {
    //   color: 0x0099ff,
    //   title: 'Feedback Recieved!',
    //   author: {
    //     name: message.author.username,
    //     icon_url: message.author.displayAvatarURL(),
    //   },
    //   description: userFeedback
    // };
    var botMessage = "Heads up! @"
        + message.author.username + message.author.discriminator
        + " has some feedback!:\n"
        + "> " + userFeedback;
    console.log(botMessage);

    // Step 2: send it to the faq-bot-dms channel
    const bot_faq_channel = bot.channels.get(channels.faq);
    bot_faq_channel.send(botMessageEmbed);

    // Step 3: let the user know their feedbback has been received
    message.reply(responses.directMessageFeedback);
};

const feedback = (bot, message, args) => {
    // Step 1: Grab the user's message to be forwarded and garnish it with related info
    var userFeedback = args.join(" ");
    const botMessageEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Feedback Recieved!')
        .addField('Feedback', userFeedback)
        .addField('User', message.author.username)
        .setTimestamp()
        .setFooter('Message ID: ' + message.id);
    // {
    //   color: 0x0099ff,
    //   title: 'Feedback Recieved!',
    //   author: {
    //     name: message.author.username,
    //     icon_url: message.author.displayAvatarURL(),
    //   },
    //   description: userFeedback
    // };
 
    // Step 2: send it to the faq-bot-dms channel
    const bot_faq_channel = bot.channels.get(channels.faq);
    bot_faq_channel.send(botMessageEmbed);
};

exports.directMessageFeedback = directMessageFeedback;
exports.feedback = feedback;