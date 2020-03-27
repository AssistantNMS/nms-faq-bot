
const versionCommands = require('./command/version');
const channels = require('./constant/channels');

async const setVoiceChannelTextToCurrentAppReleaseName = (bot) => {
    //Set the current app release version
    let appVer = await versionCommands.getCurrAppVer();
    if(appVer === -1) {
        console.log("Couldn't get app version info.");
        return;
    }
    let myGuild = bot.guilds.get(channels.thisGuild);
    let appReleaseChannel = myGuild.channels.get(channels.appRelease);
    try {
        appReleaseChannel.setName(appVer);
    } catch(err) {
        console.log("Could not set channel name", err);
    }
};

exports.setVoiceChannelTextToCurrentAppReleaseName = setVoiceChannelTextToCurrentAppReleaseName;