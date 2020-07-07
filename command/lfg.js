const Discord = require("discord.js");

const channels = require('../constant/channels');

const lfgPing = (message, args) => {
    let game = args[0];
    let gameCombined = args[0] + " " + args[1];

    let platform = args[2];
    let platformCombined = args[2] + " " + args[3];

    if (!args.length) {
        return message.channel.send("//ERROR: You didn't provide all the data!//");
    }

    if (!args[1]) {

        if (!args[3]) {
            message.channel.send("<@&721218924942721024> " + message.author.username + " is looking for a " + game + " group on " + platform + "!");
        }

        message.channel.send("<@&721218924942721024> " + message.author.username + " is looking for a " + game + " group on " + platformCombined + "!");
    }

    if (!args[3]) {
        message.channel.send("<@&721218924942721024> " + message.author.username + " is looking for a " + gameCombined + " group on " + platform + "!");
    }

    else {
        message.channel.send("<@&721218924942721024> " + message.author.username + " is looking for a " + gameCombined + " group on " + platformCombined + "!");
    }
   
}
    

exports.lfgPing = lfgPing;
