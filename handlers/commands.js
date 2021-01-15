const { readdirSync } = require('fs');

module.exports = async(client) => {
    const commands = readdirSync('./commands/').filter(i => i.endsWith('.js'));
    for (let file of commands) {
        let pull = require(`../commands/${file}`);
        client.commands.set(pull.config.name, pull);
        if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
        console.log(`Loaded: ${file}`);
    }
}