module.exports = {
    config: { 
        name: "ban", 
        description: "This command bans the user!",
        usage: "<Prefix> ban [@USERNAME]", 
        aliases: ["gtfo"]
    }, run: async (client, message, args) => {
        message.delete(500);

        if(!message.member.hasPermission(["BAN_MEMBERS"])) return message.channel.send('You do not have permission to perform this command!')
        var member = message.mentions.members.first();
        if(!args[0] || !member) return message.channel.send("Please mention a person to be banned!")

        if (!member.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR'])) {
            member.send(`:wave: You have been banned from ${message.guild} by ${message.author.username}`)
            member.ban().then((member) => {
                message.channel.send(`:wave: ${member.displayName} has been successfully banned from the server!`)
            }).catch(() => {
                message.channel.send('**Error Occured**')
            })
        }
        else {
            message.channel.send('**Nice try** :wink:: You can\'t ban this user!')
        }
    }
}