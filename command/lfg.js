const Discord = require("discord.js");

const channels = require('../constant/channels');

const lfgPing = (message, args) => {
    let game = args[0];
    let platform = args[1];
    message.channel.send("<@&721218924942721024> " + message.author.username + " is looking for a " + game + " group on " + platform + "!");
    if (!args.length) {
        return message.channel.send("//ERROR: You didn't provide all the data!//");
    }
}
    

exports.lfgPing = lfgPing;
