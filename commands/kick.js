const { RichEmbed } = require('discord.js');
const { logChannel } = require('../config.json');
module.exports = {
    config: { 
        name: "kick", 
        description: "This commands kicks the a user that is tagged",
        usage: "<Prefix> kick [@USERNAME]", 
        aliases: ["bye"]
    }, run: async (client, message, args) => {
        message.delete(500);
        const log = client.channels.get(logChannel);
        if(!message.member.hasPermission(["KICK_MEMBERS"])) return message.channel.send('You do not have permission to perform this command!')
        var member = message.mentions.members.first();
        if(!args[0] || !member) return message.channel.send("Please mention a person to be kicked!")

        if (!member.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) {
            member.send(`:wave: You have been kicked from ${message.guild} by ${message.author.username}`)
            member.kick().then((member) => {
                message.channel.send(`:wave: ${member.displayName} has been successfully kicked from the server!`);
                var date = new Date();
                const embed = new RichEmbed()
                .setTitle('Logging - Kick Command')
                .addField('Kicked User:', member.displayName, true)
                .addField('Kicked By:', message.author.username, true)
                .addField('Date:', `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`, true)
                .setThumbnail(message.guild.iconURL)
                .setColor("#b642f5")
                .setTimestamp()
                .setFooter("Heardyc LLC © 2021", "https://i.imgur.com/9KldJX1.png")
                log.send(embed);
            }).catch((error) => {
                message.channel.send('**Error Occured**')
                console.log(error.stack)
            })
        }
        else {
            message.channel.send('**Nice try** :wink:: You can\'t kick this user!')
        }
    }
}