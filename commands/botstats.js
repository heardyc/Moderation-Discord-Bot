const { RichEmbed, version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
    config:{
        name: "botstats",
        description: "displays the bots stats",
        usage: "<Prefix> botstats",
        aliases: ["bstats"]
    }, run: async(client, message, args) => {
        message.delete(500); 
        
        var duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

        const embed = new RichEmbed()
        .setTitle("Bot Stats")
        .addField("Uptime:", `${duration}`)
        .addField("Memory Usage:", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, true)
        .addField("Users:", `${client.users.size}`, true)
        .addField("Channels:", `${client.channels.size}`, true)
        .addField("Servers:", `${client.guilds.size}`, true)
        .addField("Discord.js", `${version}`, true)
        .addField("Node", `${process.version}`, true)
        .setThumbnail(client.user.avatarURL)
        .setColor("#b642f5")
        .setTimestamp()
        .setFooter("Heardyc LLC © 2021", "https://i.imgur.com/9KldJX1.png")

        message.channel.send(embed);
    }
}