
const currentTime = (message, prefix) => {
    const sysTime = moment().toDate();
    console.log(prefix + 'time was called at ' + sysTime);
    // var sysZoneAbbr = sysTime.zoneAbbr();
    // return message.channel.send("Current system time: "+sysTime+" ("+sysZoneAbbr+")");
    message.channel.send("Current system time: " + sysTime);
};

exports.currentTime = currentTime;