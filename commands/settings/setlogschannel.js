const db = require("old-wio.db");
const { PREFIX } = require('../../config/config.json');
const Discord = require('discord.js');

module.exports = {
    config: {
        name: 'logkanalayarala',
        description: 'Log Kanalı Ayarlarsınız',
        aliases: [""],
        usage: '!setlogchannel #kanal',
        accessableby: "tes",
        cooldown: '5000'
    },
    run: async (client, message, args) => {
        if(message.author.bot) return;
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Gerekli İzinlere Sahip Değilsiniz! - [YÖNETİCİ]**")

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
        
        if(!args[0]) {
            const embed = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.no} **Geçerli bir Metin Kanalı girin!**`)
                  .addField('Örnek kullanım:', '!logkanalayarala #loglar')
                  .setTimestamp(); 
            return message.channel.send(embed);
        }
            let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
            const embed2 = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.no} **Lütfen geçerli bir Metin Kanalı girin!**`)
                  .addField('Örnek kullanım: ', '!logkanalayarala #loglar')
                  .setTimestamp(); 
            if (!channel || channel.type !== 'text') return message.channel.send(embed2);
        
            try {
                let a = await db.fetch(`logs_${message.guild.id}`)
    
                if (channel.id === a) {
                    const embed3 = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.no} **Bu Kanal Zaten Log Kanalı Olarak Ayarlandı!**`)
                  .setTimestamp(); 
                    return message.channel.send(embed3)
                } else {
                    client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id);
                    db.set(`logs_${message.guild.id}`, channel.id);
                    const embed4 = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.yes} **Log Kanalı \`${channel.name}\`!** İçinde Başarıyla Ayarlandı`)
                  .setTimestamp(); 
                    message.channel.send(embed4);
                }
            } catch (err) {
                const embed5 = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.no} **Hata - \`Eksik İzinler Veya Kanal Bir Metin Kanalı Değil!\`**`)
                  .setTimestamp();
                message.channel.send(embed5);
                return console.log(err);
        }
    }
}
