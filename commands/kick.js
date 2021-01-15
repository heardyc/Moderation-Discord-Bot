module.exports = {
    config: { 
        name: "kick", 
        description: "This commands kicks the a user that is tagged",
        usage: "<Prefix> kick [@USERNAME]", 
        aliases: ["bye"]
    }, run: async (client, message, args) => {
        message.delete(500);

        if(!message.member.hasPermission(["KICK_MEMBERS"])) return message.channel.send('You do not have permission to perform this command!')
        var member = message.mentions.members.first();
        if(!args[0] || !member) return message.channel.send("Please mention a person to be kicked!")

        if (!member.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) {
            member.send(`:wave: You have been kicked from ${message.guild} by ${message.author.username}`)
            member.kick().then((member) => {
                message.channel.send(`:wave: ${member.displayName} has been successfully kicked from the server!`)
            }).catch(() => {
                message.channel.send('**Error Occured**')
            })
        }
        else {
            message.channel.send('**Nice try** :wink:: You can\'t kick this user!')
        }
    }
}