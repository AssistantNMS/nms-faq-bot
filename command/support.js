const Discord = require("discord.js");

const links = (message) => {
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

const ticket = (message) => {
    let supportticket1 = ("To log your support issue and get our team working on it, please copy the format below, fill it in with your bug information, and send it to support@nmsassistant.com to generate a support ticket.");
    let supportticket2 = new Discord.RichEmbed()
        .setDescription("**Template for a Support Ticket**")
        .setColor("#148AFF")
        .addField("__**Description**__", "- OS\n- Phone\n- App Version")
        .addField("__**Actual Behavior**__", "*Example* \n There is a delay scrolling up the list than there is scrolling down")
        .addField("__**Expected Behavior (Optional)**__", "*Example*\nI should be able to scroll back up at the same rate and responsive that I scrolled down the list")
        .addField("__**Attachments**__", "*When applicable, attach the following:*\n- Logs\n- Video\n- Screenshots");

    message.channel.send(supportticket1)
        .then(() => {
            message.channel.send(supportticket2);
        });
};

const freshdesk = (message) => {
    let freshdeskEmbed = new Discord.RichEmbed()
        .setDescription("**Freshdesk Site**")
        .setColor("#148AFF")
        .addField("For help with bugs, please go to the Assistant for NMS site found here:", "**Click the new support ticket button, or read the knowledge base**\nhttps://nmsassistant.freshdesk.com")

    message.channel.send(freshdeskEmbed);
};

exports.links = links;
exports.ticket = ticket;
exports.freshdesk = freshdesk;