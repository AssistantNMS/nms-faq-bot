const Discord = require("discord.js");

const lfgPing = (message, args) => {

    if (!args.length) {

        return message.channel.send("//ERROR: You didn't provide all the data!//");
    }

    if (args.length < 3) {

        let game = args[0];
        let platform = args[1];

        if (args[1] === 'Xbox1') {
            message.channel.send("<@&721218924942721024> " + message.author.username + " is looking for a " + game + " group on Xbox 1!");
        }

        else {
            message.channel.send("<@&721218924942721024> " + message.author.username + " is looking for a " + game + " group on " + platform + "!");
        }

        //message.channel.send("Less than 2");

    }

    else if (args.length > 2) {

        let gameCombined = args[0] + " " + args[1];
        let platform = args[2];

        if (args[2] === 'Xbox1') {
            message.channel.send("<@&721218924942721024> " + message.author.username + " is looking for a " + game + " group on Xbox 1!");
        }

        else {
            message.channel.send("<@&721218924942721024> " + message.author.username + " is looking for a " + gameCombined + " group on " + platform + "!");
        }
       
        //message.channel.send("More than 2");

    }

}
    

exports.lfgPing = lfgPing;
