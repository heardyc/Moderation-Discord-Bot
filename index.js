const { Client, Collection } = require('discord.js');
const { discordToken } = require('./config.json');

const client = new Client();

['commands', 'aliases'].forEach(i => client[i] = new Collection());
['commands', 'events'].forEach(i => require(`./handlers/${i}`)(client));

client.login(discordToken);
