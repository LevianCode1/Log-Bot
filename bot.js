const Discord = require('discord.js');
const db = require('old-wio.db');
const request = require(`request`);
const fs = require(`fs`);

const client = new Discord.Client();
const logs = require('discord-logs');
logs(client);

client.config = require('./config/config.json');
client.emotes = require('./config/emotes.json');
client.apis = require('./config/apis.json');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["aliases", "commands"].forEach(cmd => client[cmd] = new Discord.Collection());
["console", "command", "event"].forEach(events => require(`./handler/${events}`)(client));

client.categories = fs.readdirSync('./commands/')

client.on('ready', () => {
    console.log('Levian')
});

client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
  let embedcolor = db.fetch(`logs_embedcolor_${channel.guild.id}`);
  let logchannel = db.fetch(`logs_${channel.guild.id}`)
          if (!logchannel) return;

          const embed = new Discord.MessageEmbed()
              .setAuthor(channel.guild.name, channel.guild.iconURL())
              .setColor(embedcolor || 'BLACK')
              .setFooter(client.user.username, client.user.avatarURL())
              .setDescription(`⚒️ **${channel} Kanal Güncellendi!**`)
              .setTimestamp();

          var sChannel = channel.guild.channels.cache.get(logchannel)
          if (!sChannel) return;
          sChannel.send(embed)
});

client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
  let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
  let logchannel = db.fetch(`logs_${guild.id}`)
          if (!logchannel) return;

          const embed = new Discord.MessageEmbed()
                .setAuthor(channel.guild.name, guild.iconURL())
                .setColor(embedcolor || 'BLACK')
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription('⚒️ **Kanal Açıklamasi Değiştirildi**')
                .addField("Old topic ", `\`\`\`${oldTopic}\`\`\``, true)
                .addField("New topic ", `\`\`\`${newTopic}\`\`\``, true)
                .setTimestamp();

          var sChannel = channel.guild.channels.cache.get(logchannel)
          if (!sChannel) return;
          sChannel.send(embed)
});

client.on("guildMemberRoleAdd", (member, role) => {
  let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
  let logchannel = db.fetch(`logs_${member.guild.id}`)
          if (!logchannel) return;

          const embed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                .setColor(embedcolor || 'BLACK')
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription(`✍️ <@${member.user.id}> **Güncellendi**`)
                .addField("Roller:", `${client.emotes.yes} ${role}`, true)
                .setThumbnail(member.user.avatarURL({dynamic:true}))
                .setTimestamp();

          var sChannel = member.guild.channels.cache.get(logchannel)
          if (!sChannel) return;
          sChannel.send(embed)
});

client.on("guildMemberRoleRemove", (member, role) => {
  let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
  let logchannel = db.fetch(`logs_${member.guild.id}`)
          if (!logchannel) return;

          const embed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                .setColor(embedcolor || 'BLACK')
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription(`✍️ <@${member.user.id}> **Güncellendi**`)
                .addField("Roller:", `${client.emotes.no} ${role}`, true)
                .setThumbnail(member.user.avatarURL({dynamic:true}))
                .setTimestamp();

          var sChannel = member.guild.channels.cache.get(logchannel)
          if (!sChannel) return;
          sChannel.send(embed)
});

client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
  let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
  let logchannel = db.fetch(`logs_${member.guild.id}`)
          if (!logchannel) return;

          const embed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                .setColor(embedcolor || 'BLACK')
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription(`✍️ <@${member.user.id}> **Güncellendi.**`)
                .addField("Eski takma ad: ", `\`\`\`${oldNickname}\`\`\`` || `\`\`\`${member.user.username}\`\`\``, true)
                .addField("Yeni takma ad: ", `\`\`\`${newNickname}\`\`\`` || `\`\`\`${member.user.username}\`\`\``, true)
                .setThumbnail(member.user.avatarURL({dynamic:true}))
                .setTimestamp();

          var sChannel = member.guild.channels.cache.get(logchannel)
          if (!sChannel) return;
          sChannel.send(embed)
});

client.on("guildMemberBoost", (member) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.guild.name}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} <@${member.user.id}> **Sunucuya Takviye Yaptı!**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildMemberUnboost", (member) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.guild.name}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} <@${member.user.id}> **Sunucudan Takviyesini Çekti!**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${guild.name}`, guild.iconURL())
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} **Sunucu Takviye Seviyesi Yükseldi!**`)
                    .addField("Eski Seviye: ", `\`\`\`${oldLevel}\`\`\``, true)
                    .addField("Yeni Seviye: ", `\`\`\`${newLevel}\`\`\``, true)
                    .setThumbnail(guild.iconURL())
                    .setTimestamp();
    
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${guild.name}`, guild.iconURL())
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} **Sunucu Takviye Seviyesi Düşüyor!.**`)
                    .addField("Eski Seviye: ", `\`\`\`${oldLevel}\`\`\``, true)
                    .addField("Yeni Seviye: ", `\`\`\`${newLevel}\`\`\``, true)
                    .setThumbnail(guild.iconURL())
                    .setTimestamp();
    
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on('guildRegionUpdate', (guild, oldRegion, newRegion) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
      const oldUpper = oldRegion.charAt(0).toUpperCase() + oldRegion.substring(1);
      const newUpper = newRegion.charAt(0).toUpperCase() + oldRegion.substring(1);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Sunucu Bölgesi Değiştirildi**')
                  .addField("Eski Bölge: ", `\`\`\`${oldUpper}\`\`\``, true)
                  .addField("Yeni Bölge: ", `\`\`\`${newUpper}\`\`\``, true)
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildBannerAdd", (guild, bannerURL) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Sunucu Afişi Değiştirildi**')
                  .setImage(bannerURL)
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("emojiCreate", function(emoji){
      let embedcolor = db.fetch(`logs_embedcolor_${emoji.guild.id}`);
      let logchannel = db.fetch(`logs_${emoji.guild.id}`);
              if (!logchannel) return;
            if(emoji.animated == true) {
              const embed = new Discord.MessageEmbed()
                  .setAuthor(emoji.guild.name, emoji.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Sunucuda Emoji Oluşturuldu**')
                  .addField('İsim: ', `\`\`\`${emoji.name}\`\`\``, false)
                  .addField('İD: ', `\`\`\`${emoji.id}\`\`\``, false)
                  .addField('Animasyon: ', `\`\`\`${emoji.animated}\`\`\``, false)
                  .addField('Nasıl görünüyor:', `<a:${emoji.name}:${emoji.id}>`, false)
                  .setTimestamp();
  
              var sChannel = emoji.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
            } else {
                  const embed2 = new Discord.MessageEmbed()
                  .setAuthor(emoji.guild.name, emoji.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Sunucuda Emoji Oluşturuldu**')
                  .addField('İsim: ', `\`\`\`${emoji.name}\`\`\``, false)
                  .addField('İD: ', `\`\`\`${emoji.id}\`\`\``, false)
                  .addField('Animasyon: ', `\`\`\`${emoji.animated}\`\`\``, false)
                  .addField('Nasıl görünüyor:', `<a:${emoji.name}:${emoji.id}>`, false)
                  .setTimestamp();
  
              var sChannel2 = emoji.guild.channels.cache.get(logchannel)
              if (!sChannel2) return;
              sChannel2.send(embed2)
            }
});

client.on("emojiDelete", function(emoji){
      let embedcolor = db.fetch(`logs_embedcolor_${emoji.guild.id}`);
      let logchannel = db.fetch(`logs_${emoji.guild.id}`);
              if (!logchannel) return;
              const embed = new Discord.MessageEmbed()
                  .setAuthor(emoji.guild.name, emoji.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Sunucuda Emoji Silindi**')
                  .addField('İsim: ', `\`\`\`${emoji.name}\`\`\``, false)
                  .addField('İD: ', `\`\`\`${emoji.id}\`\`\``, false)
                  .addField('Animasyon: ', `\`\`\`${emoji.animated}\`\`\``, false)
                  .setTimestamp();
  
              var sChannel = emoji.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildAfkChannelAdd", (guild, afkChannel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **AFK Kanalı Değiştirildi!**')
                  .addField('AFK Kanalı:', afkChannel, false)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildVanityURLAdd", (guild, vanityURL) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Özel URL Ayarlandı!**')
                  .addField('Özel URL:', vanityURL, false)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildBanAdd", function(guild, user){
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Kullanıcı yasaklandı!**')
                  .addField('Kullanıcı adı:', `\`\`\`${user.username}\`\`\``, true)
                  .addField('Etiketi:', `\`\`\`${user.discriminator}\`\`\``, true)
                  .addField('İD:', `\`\`\`${user.id}\`\`\``, false)
                  .addField('Oluşturulma Tarihi:', `\`\`\`${user.createdAt.toLocaleDateString()}\`\`\``, false)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildBanRemove", function(guild, user){
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Kullanıcının yasağı kaldırıldı!**')
                  .addField('Kullanıcı adı:', `\`\`\`${user.username}\`\`\``, true)
                  .addField('Etiketi:', `\`\`\`${user.discriminator}\`\`\``, true)
                  .addField('İD:', `\`\`\`${user.id}\`\`\``, false)
                  .addField('Oluşturma Tarihi:', `\`\`\`${user.createdAt.toLocaleDateString()}\`\`\``, false)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildMemberAdd", function(member){
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(member.guild.name, member.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Kullanıcı Katıldı!**')
                  .addField('Kullanıcı adı:', `\`\`\`${member.user.username}\`\`\``, true)
                  .addField('Etiketi:', `\`\`\`${member.user.discriminator}\`\`\``, true)
                  .addField('İD:', `\`\`\`${member.user.id}\`\`\``, false)
                  .addField('Oluşturma Tarihi:', `\`\`\`${member.user.createdAt.toLocaleDateString()}\`\`\``, false)
                  .setThumbnail(member.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildMemberRemove", function(member){
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(member.guild.name, member.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Kullanıcı Sunucudan Ayrıldı Veya Atıldı!**')
                  .addField('Kullanıcı adı:', `\`\`\`${member.user.username}\`\`\``, true)
                  .addField('Etiketi:', `\`\`\`${member.user.discriminator}\`\`\``, true)
                  .addField('İD:', `\`\`\`${member.user.id}\`\`\``, false)
                  .addField('Oluşturma Tarihi:', `\`\`\`${member.user.createdAt.toLocaleDateString()}\`\`\``, false)
                  .setThumbnail(member.guild.iconURL())
                  .setTimestamp();

              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("roleCreate", function(role){
      let embedcolor = db.fetch(`logs_embedcolor_${role.guild.id}`);
      let logchannel = db.fetch(`logs_${role.guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(role.guild.name, role.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Rol oluşturuldu!**')
                  .addField('İsim:', `\`\`\`${role.name}\`\`\``, false)
                  .addField('İD:', `\`\`\`${role.id}\`\`\``, false)
                  .addField('Bahsedilebilir?: ', `\`\`\`${role.mentionable}\`\`\``, false)
                  .addField('Rol Rengi:', `\`\`\`${role.color}\`\`\``, false)
                  .setThumbnail(role.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = role.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("roleDelete", function(role){
      let embedcolor = db.fetch(`logs_embedcolor_${role.guild.id}`);
      let logchannel = db.fetch(`logs_${role.guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(role.guild.name, role.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Rol oluşturuldu!**')
                  .addField('İsim:', `\`\`\`${role.name}\`\`\``, false)
                  .addField('İD:', `\`\`\`${role.id}\`\`\``, false)
                  .addField('Bahsedilebilir?: ', `\`\`\`${role.mentionable}\`\`\``, false)
                  .addField('Rol Rengi:', `\`\`\`${role.color}\`\`\``, false)
                  .setThumbnail(role.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = role.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildVanityURLRemove", (guild, vanityURL) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Özel URL Kaldırıldı!**')
                  .addField('Özel URL:', `\`\`\`${vanityURL}\`\`\``, false)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Özel URL Değiştirildi!**')   
                  .addField('ESKİ Özel URL:', `\`\`\`${oldVanityURL}\`\`\``, true)
                  .addField('YENİ Özel URL:', `\`\`\`${newVanityURL}\`\`\``, true)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildFeaturesUpdate", (oldGuild, newGuild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${newGuild.id}`);
      let logchannel = db.fetch(`logs_${newGuild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(newGuild.name, newGuild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Sunucuda yeni özellikler kazanın!**')   
                  .addField('Yeni özellikler:', `\`\`\`${newGuild.features.join(", ")}\`\`\``, true)
                  .setThumbnail(newGuild.iconURL())
                  .setTimestamp();
  
              var sChannel = newGuild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildAcronymUpdate", (oldGuild, newGuild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${newGuild.id}`);
      let logchannel = db.fetch(`logs_${newGuild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(newGuild.name, newGuild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Kısaltma Güncellendi !**')   
                  .addField('Yeni Kısaltma:', `\`\`\`${newGuild.nameAcronym}\`\`\``, true)
                  .setThumbnail(newGuild.iconURL())
                  .setTimestamp();
  
              var sChannel = newGuild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildOwnerUpdate", (oldGuild, newGuild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${newGuild.id}`);
      let logchannel = db.fetch(`logs_${newGuild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(newGuild.name, newGuild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Sunucu Sahibi Güncellendi!**')   
                  .addField('Eski Sunucu Sahibi:', `<@${oldGuild.owner.id}>`, true)
                  .addField('Yeni Sunucu Sahibi:', `<@${newGuild.owner.id}>`, true)
                  .setThumbnail(newGuild.iconURL())
                  .setTimestamp();
  
              var sChannel = newGuild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildPartnerAdd", (guild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Sunucu Ortak Oldu!**')   
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildPartnerRemove", (guild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Sunucu Artık Partner Sunucu Değil!**')   
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildVerificationAdd", (guild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Sunucu Onaylandı!**')   
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildVerificationRemove", (guild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Sunucu Artık Doğrulanmış Değil!**')   
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("messagePinned", (message) => {
      let embedcolor = db.fetch(`logs_embedcolor_${message.guild.id}`);
      let logchannel = db.fetch(`logs_${message.guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Mesaj sabitlendi!**')
                  .addField('İçerik:', message, true)
                  .addField('Kanal:', `<#${message.channel.id}>`, true) 
                  .addField('Mesaj Sahibi:', message.author, true)  
                  .setThumbnail(message.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = message.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("messageContentEdited", (message, oldContent, newContent) => {
      let embedcolor = db.fetch(`logs_embedcolor_${message.guild.id}`);
      let logchannel = db.fetch(`logs_${message.guild.id}`);
              if (!logchannel) return;

              const embed = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Mesaj güncellendi!**')
                  .addField('Gönderen:', message.author, true) 
                  .addField('Kanal:', `<#${message.channel.id}>`, true)
                  .addField('\u200B', '\u200B', false)
                  .addField('Eksi Mesaj:', oldContent, true)
                  .addField('Yeni Mesaj:', newContent, true)  
                  .setThumbnail(message.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = message.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("messageDelete", function(message){
      let embedcolor = db.fetch(`logs_embedcolor_${message.guild.id}`);
      let logchannel = db.fetch(`logs_${message.guild.id}`);
              if (!logchannel) return;
            if(message.attachments.first()) {
              const embed = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Mesaj silindi!**')
                  .addField('Gönderen:', message.author, true) 
                  .addField('Kanal:', `<#${message.channel.id}>`, true)
                  .setImage(message.attachments.first().proxyURL)
                  .setTimestamp();

                  var sChannel = message.guild.channels.cache.get(logchannel)
                  if (!sChannel) return;
                  sChannel.send(embed)
            } else {
                  const embed = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Mesaj silindi!**')
                  .addField('Gönderen:', message.author, true) 
                  .addField('Kanal:', `<#${message.channel.id}>`, true)
                  .addField('Mesaj içeriği:', message.content || `Mesaj verilerini alamıyorum (Embed Halinde)`, false)
                  .setTimestamp();

                  var s1Channel = message.guild.channels.cache.get(logchannel)
                  if (!s1Channel) return;
                  s1Channel.send(embed)
            }
});

client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
      let embedcolor = db.fetch(`logs_embedcolor_${role.guild.id}`);
      let logchannel = db.fetch(`logs_${role.guild.id}`);
              if (!logchannel) return;

              const embed = new Discord.MessageEmbed()
                  .setAuthor(role.guild.name, role.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Rol Pozisyonu Güncellendi!**')
                  .addField('Rol:', `\`\`\`${role.name}\`\`\``, true) 
                  .addField('Eski Pozisyon:', `\`\`\`${oldPosition}\`\`\``, true)
                  .addField('Yeni Pozisyon:', `\`\`\`${newPosition}\`\`\``, true)
                  .setThumbnail(role.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = role.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {
      let embedcolor = db.fetch(`logs_embedcolor_${role.guild.id}`);
      let logchannel = db.fetch(`logs_${role.guild.id}`);
              if (!logchannel) return;

              const embed = new Discord.MessageEmbed()
                  .setAuthor(role.guild.name, role.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`⚒️ **${role} İzinler Güncellendi!**`)
                  .setThumbnail(role.guild.iconURL())
                  .setTimestamp(); 
  
              var sChannel = role.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelJoin", (member, channel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **<#${channel.id}> Katıldı.**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelLeave", (member, channel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **<#${channel.id}> Ayrıldı.**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **Ses Kanalını Değiştirdi.**`)
                    .addField(`Eski Kanal: `, `\`\`\`${oldChannel.name}\`\`\``, true)
                    .addField(`Yeni Kanal: `, `\`\`\`${newChannel.name}\`\`\``, true)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelMute", (member, muteType) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **Susturuldu! (tür: ${muteType})**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelUnmute", (member, oldMuteType) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **Sesi Açıldı! **`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelDeaf", (member, deafType) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **Sağırlaştırıldı! (tür: ${deafType})**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelUndeaf", (member, deafType) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **Sağırlaştırma Kaldırıldı! **`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceStreamingStart", (member, voiceChannel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **${voiceChannel.name}'de Yayına Başladı! **`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceStreamingStop", (member, voiceChannel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **Yayın Durduruldu! **`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});


client.login(client.config.token);
