const Discord = require("discord.js");

const channels = require('../constant/channels');

const lfgPing = (message, args) => {
    let game = args[0] + args[1];
    let platform = args[2];

    if (!args.length) {
        return message.channel.send("//ERROR: You didn't provide all the data!//");
    }

    message.channel.send("<@&721218924942721024> " + message.author.username + " is looking for a " + game + " group on " + platform + "!");
    
}
    

exports.lfgPing = lfgPing;
