const { RichEmbed } = require('discord.js');
const { logChannel } = require('../config.json');
module.exports = {
    config: { 
        name: "purge", 
        description: "deletes unwanted messages",
        usage: "<Prefix> purge [VALUE]", 
        aliases: ["clear"]
    }, run: async (client, message, args) => {
        const log = client.channels.get(logChannel);
        if(!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send("You do not have permission to perform this command!")
        if(!args[0] || isNaN(args[0])) return message.channel.send('Please specify an amount of messages you want to delete! [0-99]')
        if(args[0] > 1 && args[0] < 100){
            message.channel.fetchMessages({limit: args[0]}).then((messages) => {
                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                message.channel.send(`**Purged** \`${args[0]}\` **Messages!**`);
                var date = new Date();
                const embed = new RichEmbed()
                .setTitle('Logging - Purge Command')
                .addField('Messages Purged:', args[0], true)
                .addField('Purged By:', message.author.username, true)
                .addField('Date:', `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`, true)
                .setThumbnail(message.guild.iconURL)
                .setColor("#b642f5")
                .setTimestamp()
                .setFooter("Heardyc LLC © 2021", "https://i.imgur.com/9KldJX1.png")
                log.send(embed);
            }) 
        } else {
            message.channel.send('Please specify a number between [1-99]');
        }
    }
}