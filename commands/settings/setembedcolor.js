const db = require("old-wio.db");
const { PREFIX } = require('../../config/config.json');
const Discord = require('discord.js');
let color;
var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i; 

module.exports = {
    config: {
        name: 'embedrenkayarla',
        description: 'test',
        aliases: [""],
        usage: 'test',
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
                  .setDescription(`${client.emotes.no} **Bana geçerli HEX Rengi ver!**`)
                  .setTimestamp(); 
            return message.channel.send(embed);
        }
        if(RegExp.test(args[0]) == false) {
            const embed2 = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.no} **\`${args[0]}\` geçerli değil HEX Renk!**`)
                  .setTimestamp(); 
            return message.channel.send(embed2);
        }
        if(RegExp.test(args[0]) == true) {
            color = args[0].match(/(#|0x)([0-9A-F]{6})/i)[2]
            db.set(`logs_embedcolor_${message.guild.id}`, color);
            const embed3 = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.yes} **Embed rengi şuna ayarlandı: \`${color}\`!**`)
                  .setTimestamp(); 
            return message.channel.send(embed3);
        }
    }
}
