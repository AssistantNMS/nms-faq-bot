const Discord = require("discord.js");

const channels = require('../constant/channels');

const lfgPing = (message) => message.channel.send("<@729649796846977084> " + message.author.username + "is looking for a group!");

exports.lfgPing = lfgPing;
