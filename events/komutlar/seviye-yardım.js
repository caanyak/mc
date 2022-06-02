const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {

        if(!args[0]) {
   
            if (!message.guild) {
                const ozelmesajuyari = new Discord.MessageEmbed()
                .setColor(0xFF0000)
                .setTimestamp()
                .setAuthor(message.author.username, message.author.avatarURL)
                .addField('**Seviye Komutları Özel Mesajlarda Kullanılamaz!**')
                return message.author.send(ozelmesajuyari); }
            const NARCOSEMBED = new Discord.MessageEmbed()
            .setAuthor("Seviye || Yardım Menüsü", client.user.avatarURL())
           .setColor("#BLUE")
          .setDescription(`Kobat Network**
        
          - Yetkili Komutları:
          
        >  \`!seviye-ayarlar\` ➔ Seviye Ayarlarını Gösterir.**
        >  \`!seviye-xp\` ➔ Mesaj Başına Gelen XP Yi Ayarlarsınız.**
        >  \`!seviye-sınır\` ➔ Max Seviyeyi Ayarlarsınız.**
        >  \`!seviye-sıfırla\` ➔ Seviye Ayarlarını Sıfırlarsınız.**
        >  \`!seviye-log\` ➔ Seviye Logunu Ayarlarlarsınız.**
        >  \`!seviye-rol\` ➔ Seviye Rollerini Sıfırlarsınız.**
        
          - Kullanıcı Komutları:
        
        > \`!seviyem\` ➔ Seviyene Bakarsın.**
        > \`!kartayar\` ➔ Seviye Tablonuzun Arka Planına kart ayarlarsınız.**

        
          `)   
        
          message.channel.send({embeds: [NARCOSEMBED]})  
            }


},

name: "seviye-yardım",
description: "",
aliases: [],
kategori: "",
usage: "",
}
