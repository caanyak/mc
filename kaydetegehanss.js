const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [{
  name: 'destek',
  description: 'Size özel destek kanalı açar bilginize'
},
{
  name : "destek-kapat",
  description : "Desteği kapatır."
}]; 

const rest = new REST({ version: '9' }).setToken("OTU1OTExOTQyMDI1OTIwNTQy.YjokXg.H16GELIzmd4euVAh3lr2KRoswAo");

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands("955911942025920542", "948989528847290478"),
      { body: commands },
    );

    console.log('Komut eklendi');
  } catch (error) {
    console.error(error);
  }
})();