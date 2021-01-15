const { readdirSync } = require('fs');

module.exports = async(client) => {
    const events = readdirSync('./events/').filter(i => i.endsWith('.js'));
    for (let file of events){
        const evt = require(`../events/${file}`);
        let evName = file.split('.')[0];
        client.on(evName, evt.bind(null, client));
    }
}