const Discord = require("discord.js");
module.exports = {
    calistir: async(client, message, args) => {

        const { MessageEmbed } = require('discord.js')
        const embed = new MessageEmbed()
        .setTimestamp()
        .setColor("BLUE")
        .setTitle('Sunucu Bilgileri')
        .setDescription('**IP**: `oyna.kobatnetwork.tk`\n**Port**: `19132`\n**Sürüm**: `1.18.30`  ')
        message.channel.send({embeds: [embed]})



},

name: "ip",
description: "Sunucu IP",
aliases: ["sunucu","ip"],
kategori: "mod",
usage: "",
}
