module.exports = {
    config: { 
        name: "purge", 
        description: "deletes unwanted messages",
        usage: "<Prefix> purge [VALUE]", 
        aliases: ["clear"]
    }, run: async (client, message, args) => {
        message.delete(500);
        if(!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send("You do not have permission to perform this command!")
        if(!args[0] || isNaN(args[0])) return message.channel.send('Please specify an amount of messages you want to delete! [0-99]')
        if(args[0] > 1 && args[0] < 100){
            message.channel.fetchMessages({limit: args[0]}).then((messages) => {
                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                message.channel.send(`**Purged** \`${args[0]}\` **Messages!**`);
            }) 
        } else {
            message.channel.send('Please specify a number between [1-99]');
        }

    }
}