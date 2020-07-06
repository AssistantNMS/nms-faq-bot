const Discord = require("discord.js");

const channels = require('../constant/channels');

const lfgPing = (message) => {
    var userInput = args.join(" ");
    message.channel.send("`<@& 729649796846977084>` " + message.author.username + " is looking for a " +userInput + " group!");
}
    

exports.lfgPing = lfgPing;
