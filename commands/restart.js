const {ownerID, discordToken} = require("../config.json");

module.exports = {
    config: { 
        name: "restart", 
        description: "Restarts the discord bot",
        usage: "<Prefix> restart"
    }, run: async (client, message, args) => {
        message.delete(500);
        if (message.author.id == ownerID) {
            message.channel.send("Restarting in 5 seconds!");
            setTimeout(() => {
                message.channel.send("Restarting!").then(m => {
                    client.destroy().then(() => {
                        client.login(discordToken)
                    })
                })
            }, 5000);
        } else {
            message.channel.send("You don't have permission to perform this command!")
            return;
        }
    }
}