const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require('old-wio.db');
const { stripIndents } = require("common-tags");
const { PREFIX } = require('../../config/config.json');

module.exports = {
    config: {
        name: 'yardım',
        description: 'test',
        aliases: [""],
        usage: 'test',
        accessableby: "tes",
        cooldown: '5000'
    },
    run: async (client, message, args) => {
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }

        const embed = new MessageEmbed()
            .setColor("black")
            .setAuthor(`${message.guild.me.displayName} Yardım`, message.guild.iconURL())
            .setThumbnail(client.user.displayAvatarURL())

        if (!args[0]) {

            embed.setFooter(`${message.guild.me.displayName} | Toplam Komut - ${client.commands.size - 1} Yüklendi`, client.user.displayAvatarURL());
            embed.addField(`${client.emotes.settings} Ayarlar - `, '`logkanalayarala`, `embedrenkayarla`')
            embed.addField(`${client.emotes.help} Bilgi Komutları - `, '`yardım`')

            return message.channel.send(embed)
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send(embed.setTitle("**Hatalı Komut!**").setDescription(`**Örn: \`${prefix}yardım\`Komut Listesini Görmek İçin**`))
            command = command.config
            
            embed.setDescription(stripIndents`**Levian Logger \`${PREFIX}\`**\n
            **Sunucu Ön Eki:\`${prefix}\`**\n
            ** Komut -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
            ** Açıklama -** ${command.description || "Açıklama Belirtilmemiş."}\n
            ** Kategori -** ${command.category}\n
            ** Kullanım -** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "Kullanım Yok"}\n
            ** Gerekli İzinler -** ${command.accessableby || "Herkes Bu Komutu Kullana Bilir"}\n
            ** Kısa Yol -** ${command.aliases ? command.aliases.join(", ") : "Yok."}`)
            embed.setFooter(message.guild.name, message.guild.iconURL())

            return message.channel.send(embed)
        }
    }
}
