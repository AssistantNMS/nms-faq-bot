const Discord = require("discord.js");

const echoMessage = (message, args) => {
    var userInput = args.join(" ");

    message.channel.send(userInput);
}

exports.echoMessage = echoMessage;