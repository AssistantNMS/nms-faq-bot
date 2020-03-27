const Discord = require("discord.js");
const versionCommands = require('./command/version');

const infoResponse = (message, prefix) => {
    message.reply("I'm an FAQ Bot, made by Vapour38 and Blend3rman to be used on the AssistantforNMS Discord server, which can be found here: https://discord.gg/sVF32Pq"
        + " On the server, I have a list of FAQs which can be accessed by typing their command. A list of commands can be found by typing `" + prefix + "help` on the server."
        + " I also have a list of commands that can be used right here! By using `" + prefix + "info` right here, you can bring this message up."
        + " By using `" + prefix + "modhelp`, then your message, you can send a message to the mods at the AssistantNMS sever asking for help. They will reply to you here."
        + " By using `" + prefix + "suggest`, then your suggestion, you can suggest an FAQ to the mods, which they will review and possibly add to the bot. A suggestion can range from anything from a question you want answered, to a bug you have found a fix for.");

};

const defaultResponse = (message, prefix) => {
    message.reply("Hi there, would you like help from a human? Or would you like to suggest an FAQ or just get general info on me?"
        + " Send me your query with `" + prefix + "modhelp <your question>`,"
        + " and I'll find a mod to help you out!"
        + " If you want to suggest an FAQ or suggestion for the server, type `" + prefix + "suggest <your message>`."
        + " Or, if you want some info on what I do, type `" + prefix + "info`.");
};

const links = (message) => {
    let links = new Discord.RichEmbed()
        .setDescription("**Links**")
        .setColor("#148AFF")
        .addField("__**Applications**__", "Website: https://nmsassistant.com\nAndroid: https://play.google.com/store/apps/details?id=com.kurtlourens.no_mans_sky_recipes\niOS: https://apps.apple.com/us/app/id1480287625\nWebApp: https://app.nmsassistant.com\nDiscord Bot: Coming Soon")
        .addField("__**Social**__", "Reddit: https://www.reddit.com/r/AssistantforNMS\nTwitter: https://twitter.com/AssistantNMS\nInstagram: https://instagram.com/AssistantNMS\nFacebook: https://facebook.com/AssistantNMS\nSteam Community Page: https://steamcommunity.com/groups/AssistantNMS\nNoMansSky Social: https://nomanssky.social/AssistantNMS");

    message.channel.send(links);
};

const support = (message) => {
    let support = new Discord.RichEmbed()
        .setDescription("**Assistant for NMS support links**")
        .setColor("#148AFF")
        .addField("__**Email**__", "You can email our support at support@nmsassistant.com, using the template found in ?supportticket")
        .addField("__**Website**__", "Our support website can be found at https://nmsassistant.freshdesk.com, or use the links in ?freshdesk and ?faq ");

    message.channel.send(support)
        .then(() => {
            message.channel.send("We hope to iron our all our major bugs ASAP. Let us know if you have any ideas, we’d love to hear from you!");
        });
};

const appVersion = async (message) => {
    let appVer = await versionCommands.getCurrAppVer();
    if(appVer === -1) {
        console.log("Couldn't get app version.");
        message.channel.send("Couldn't get app version.");
    }
    else
        message.channel.send("Current app version: "+appVer);
};

const faq = (message) => message.channel.send("If you can’t find the answers you’re looking for here, try checking out our full FAQ on Freshdesk: https://nmsassistant.freshdesk.com/");
const translation = (message) => message.channel.send("If you are fluent in a language that isn't already implimented into the app, go to https://nmsassistant.com/tools/translate, or talk to @KhaozTopsy#7865 directly");
const guides = (message) => message.channel.send("If you would like to contribute your knowledge of NMS towards the app, head to https://nmsassistant.com/tools/guide and create a guide for us! If approved, this will then be featured in the guides section of the app");


exports.infoResponse = infoResponse;
exports.defaultResponse = defaultResponse;
exports.links = links;
exports.support = support;
exports.faq = faq;
exports.translation = translation;
exports.guides = guides;
exports.appVersion = appVersion;
