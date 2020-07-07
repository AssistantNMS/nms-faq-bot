const Discord = require("discord.js");

const channels = require('../constant/channels');

const lfgPing = (message, args) => {
    message.channel.send("<@&729649796846977084> " + message.author.username + " is looking for a " + args + " group!");
    if (!args.length) {
        return message.channel.send("//ERROR: You didn't provide all the data!//");
    }
}
    

exports.lfgPing = lfgPing;
