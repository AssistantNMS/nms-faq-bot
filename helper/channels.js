const fetch = require("node-fetch");

const setVoiceChannelTextToCurrentAppReleaseName = (bot) => {
    //Set the current app release version
    fetch('https://api.nmsassistant.com/version')
        .then(response => response.json())
        .then(data => {
            //Set Current Version voice channel as app release
            let myGuild = bot.guilds.get('625007826913198080');
            let appReleaseChannel = myGuild.channels.get('662465837558398979');
            appReleaseChannel.setName(data.name);
        }).catch(exception => {
            console.log('Could not set voice channel text', exception);
        });
}

exports.setVoiceChannelTextToCurrentAppReleaseName = setVoiceChannelTextToCurrentAppReleaseName;