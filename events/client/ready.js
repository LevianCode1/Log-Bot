const { PREFIX } = require('../../config/config.json');

module.exports = async client => {
    let totalUsers = client.guilds.cache.reduce((users, value) => users + value.memberCount, 0)
    let totalGuilds = client.guilds.cache.size
    console.log('\x1b[32m%s\x1b[0m', `LEVİAN: [BİLGİ] ${client.user.tag} İsimli Bot Aktif`)

    
    var activities = [
        `Levian Logger Bot`

        ], i = 0;
    setInterval(() => client.user.setActivity(`Levian Youtube | ${activities[i++ % activities.length]}`, { type: "WATCHING" }),15000)
}
