const Discord = require("discord.js");

const responses = require('../constant/responses');

const echoMessage = (message, args) => {
    var userInput = args.join(" ");

    message.delete(500);
    message.channel.send(userInput);
}

const clearMessages = async (message, amount) => {
    if (!amount) return message.reply(responses.incomplete);
    if (isNaN(amount)) return message.reply(responses.notNumber);

    if (amount > 100) return message.reply('//ERROR: I am unable to delete more than 100 messages at once.//');
    if (amount < 1) return message.reply('//ERROR: I have to delete at least one message.//');

    await channel.fetchMessages({ limit: amount }).then(messages => {
        message.channel.bulkDelete(messages)
    });
}

exports.echoMessage = echoMessage;
exports.clearMessages = clearMessages;