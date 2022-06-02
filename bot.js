const { Client, Intents, Collection, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_BANS,Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Intents.FLAGS.GUILD_INTEGRATIONS,Intents.FLAGS.GUILD_WEBHOOKS,Intents.FLAGS.GUILD_INVITES,Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Intents.FLAGS.GUILD_MESSAGE_TYPING,Intents.FLAGS.DIRECT_MESSAGES,Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const ayarlar = require("./ayarlar.json");
const db = require("nrc.db");
const message = require("./events/message");
let prefix = ayarlar.prefix;

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
  require(`./komutcalistirici`)(client);
}); 

client.on("ready", () => {
  require("./events/eventLoader")(client);
});


const Discord = require("discord.js");

client.on("message", async msg => {

  if(msg.content.startsWith(ayarlar.prefix)) return;

  const db = require('nrc.db');

  var id = msg.author.id;

  var gid = msg.guild.id;

  var xp = await db.fetch(`xp_${id}_${gid}`);

  var lvl = await db.fetch(`lvl_${id}_${gid}`);

  let seviyexp = await db.fetch(`seviyexp${msg.guild.id}`)

  const skanal = await db.fetch(`seviyekanal${msg.guild.id}`)

  let kanal = msg.guild.channels.cache.get(skanal)

  if (msg.author.bot === true) return;

  const seviyeEmbed = new Discord.MessageEmbed()

   seviyeEmbed.setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun!`)

   seviyeEmbed.setFooter(`${client.user.username} | Seviye Sistemi`)

   seviyeEmbed.setColor("RANDOM")

   if(!lvl) {
    db.set(`xp_${id}_${gid}`, 5);

    db.set(`lvl_${id}_${gid}`, 1);

    db.set(`xpToLvl_${id}_${gid}`, 100);

    db.set(`top_${id}`, 1)

    }

  

  let veri1 = [];

  

  if(seviyexp) veri1 = seviyexp

  if(!seviyexp) veri1 = 5

  

  if (msg.content.length > 7) {

    db.add(`xp_${id}_${gid}`, veri1)

  };

  let seviyesınır = await db.fetch(`seviyesınır${msg.guild.id}`)

    let veri2 = [];

  

  if(seviyesınır) veri2 = seviyesınır

  if(!seviyesınır) veri2 = 250

   

  if (await db.fetch(`xp_${id}_${gid}`) > veri2) {

    if(skanal) {

 kanal.send({embeds: [{embeds: [new Discord.MessageEmbed()

   .setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun:tada:`)

   .setFooter(`${client.user.username} | Seviye Sistemi`)

   .setColor("RANDOM")]}]})

    }

    db.add(`lvl_${id}_${gid}`, 1)

    db.delete(`xp_${id}_${gid}`)};

    db.set(`top_${id}`, Math.floor(lvl+1))

  });

//SEVİYE-ROL-----------------------------------
client.on('message', async message => {

  var id = message.author.id;

  var gid = message.guild.id;

  let rrol = await db.fetch(`rrol.${message.guild.id}`)

  var level = await db.fetch(`lvl_${id}_${gid}`);

  

    if(rrol) {

  rrol.forEach(async rols => {

    var rrol2 = await db.fetch(`rrol2.${message.guild.id}.${rols}`)

    if(Math.floor(rrol2) <= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.add(rols)

    }

     else if(Math.floor(rrol2) >= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.remove(rols)

    }

  })

  }

  

    if(message.content == '!rütbeler') {

    if(!rrol) {

                message.channel.send({embeds: [{embeds: [new Discord.MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`Herhangi bir rol oluşturulmadı.`)]}]})

      

      

      return;

    }

        const { MessageEmbed } = require('discord.js')

      let d = rrol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`rrol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")

    message.channel.send({embeds: [new MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`${d}`)]})

  }

  
})

client.on('message', async message => {

   var id = message.author.id;

  var gid = message.guild.id;

  let srol = await db.fetch(`srol.${message.guild.id}`)

  var level = await db.fetch(`lvl_${id}_${gid}`);

  if(srol) {

  srol.forEach(async rols => {

    var srol2 = await db.fetch(`srol2.${message.guild.id}.${rols}`)

    if(Math.floor(srol2) <= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.add(rols)

    }

     else if(Math.floor(srol2) >= Math.floor(level)) {

      let author = message.guild.member(message.author)


    }

  })

  }

    if(message.content == '!seviyerolleri' || message.content == "!levelroles") {

  if(!srol) {

                message.channel.send({embeds: [new Discord.MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`Herhangi bir rol oluşturulmadı.`)]})

      return;

    }

        const { MessageEmbed } = require('discord.js')

      let d = srol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`srol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")

    message.channel.send({embeds: [new MessageEmbed()

                      .setColor("RANDOM")

                      //.setColor(message.guild.member(message.author).highestRole.hexColor)

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`${d}`)]})

  }

})  
const { Modal, TextInputComponent, showModal } = require('discord-modals');
const discordModals = require("discord-modals");
discordModals(client);
client.on("interactionCreate",async int => {
	if(!int.isCommand()) return false;

	if(int.commandName == "destek"){

		let modal = new Modal()
			.setCustomId("destek")
			.setTitle("DESTEK")
			.addComponents([
				new TextInputComponent()
				.setPlaceholder('Konu')
				.setLabel('Konu')
				.setCustomId("destek-konu")
				.setStyle("SHORT")
				.setMinLength(5)
				.setMaxLength(35)
				.setRequired(true)
			])

		showModal(modal,{
			client : client,
			interaction : int
		});
	};

	if(int.commandName == "destek-kapat"){
		if(!client.channels.cache.get(int.channelId).name.includes("destek")) int.reply("Bu kanal bir destek kanalı değil...");
		else if(!int.member.roles.cache.get("955891463684755476") && !client.channels.cache.get(int.channelId).name.includes(int.member.user.id)) int.reply("Siz bu kanalı kapatamazsınız...");
		else client.channels.cache.get(int.channelId).delete();
	};
});

client.on("modalSubmit",async modal => {
	if(modal.customId == "destek"){
		let konu = modal.getTextInputValue("destek-konu");
		let member = modal.member;

		await modal.reply("Destek kanalınız açıldı...");

		member.guild.channels.cache.get("956242512371146882").createChannel(`${member.username}-destek`,{
			permissionOverwrites : [
				{
					id : member.guild.roles.everyone,
					deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
				},
				{
					id : member.user.id,
					allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
				},
				{
					id : "955891463684755476",
					allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
				}
			]
		}).then(chn => {
			chn.send({
				embeds : [new MessageEmbed().setTitle(`Konu : ${konu}`).setColor("RANDOM")]	
			});
		});
	};
});



const {readdirSync } = require('fs')

client.commands = new Collection();



const commandFiles = readdirSync('./komutlar').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./komutlar/${file}`);
	client.commands.set(command.name, command);
	}



const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute( client, ...args));
	}
}
client.on("messageCreate", async msg => {

  const i =  db.fetch(`küfürengel_${msg.guild.id}`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(kufur => msg.content.toLowerCase() === kufur)) {
      try {
        if (

          !msg.member.permissions.has("ADMINISTRATOR")) {
          msg.delete();
          return msg.channel.send("Küfür Yasak Dostum Lütfen Küfür Etme.")

        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  const i = db.fetch(`küfürengel_${oldMsg.guild.id}`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq",
      "pezevenk"
    ];
    if (kufur.some(kufur => newMsg.content.toLowerCase() === kufur)) {
      try {
        if (

          !newMsg.member.permissions.has("ADMINISTRATOR")) {
          newMsg.delete();
          return oldMsg
            .reply("Mesajı Düzenlediğini Yakaladım! Küfür yasak.")
     
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//const Gamedig = require('gamedig');
//
// setInterval(() => {
//
// Gamedig.query({
//
//     type: 'minecraft',
//
//    host: 'realmcpe.tk',
//
//     port: '19132',
//
//    }).then((dalethelegit) => {
//
//      var oyun = [
//
//        `${dalethelegit.players.length} Kişi Kobat Network'de`,
//
//    ];
//
//      client.user.setPresence({activity: {type : "PLAYING", name: `${oyun}` }, status: 'online'});
//
//    });
//
 // }, 2000);
client.login(ayarlar.token);
