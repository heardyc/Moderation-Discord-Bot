const { RichEmbed } = require("discord.js");

module.exports = {
    config: { 
        name: "broadcast", 
        description: "Broadcasts a message",
        usage: "<Prefix> broadcast", 
        aliases: ["announce", "announcement"]
    }, run: async (client, message, args) => {
        message.delete(500)
        if(!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send("You do not have permission to perform this command!");
        if (args.length < 1 ) return message.channel.send("Error: You need to specifiy a message!");
        let mAnnouncement = args.slice(0).join(" "); 

        const embed = new RichEmbed()
        .setTitle("Announcement")
        .setDescription(`${mAnnouncement}`)
        .setThumbnail(message.guild.iconURL)
        .setColor("#b642f5")
        .setTimestamp()
        .setFooter("Heardyc LLC © 2021", "https://i.imgur.com/9KldJX1.png")
        message.channel.send(`|| @everyone ||`,{embed});
    }
}