module.exports = async(client) => {
    console.log(`${client.user.username} is now online!`);

    let status = [`${client.guilds.size} servers`, `${client.users.size} users`], i = 0
    setInterval(() => client.user.setActivity(`${status[i++ % status.length]}`, { type: "STREAMING", url: "https://twitch.tv/heardyc"}), 10000)
}