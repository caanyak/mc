const db = require("nrc.db");

module.exports = async(client) => {

  
 




  
  
  console.log("Ayarlamalar: Durum Ayarlandı!")
  console.log("Ayarlamalar: Aktivite Ayarlandı!")
  
  console.log(" ")



  const kulsayi = []
  client.guilds.cache.forEach((item, i) => {
      kulsayi.push(item.memberCount)
  });
  var toplamkulsayi = 0
  for (var i = 0; i < kulsayi.length; i++) {
      if (isNaN(kulsayi[i])){
          continue;
      }

      toplamkulsayi += Number(kulsayi[i])
  }

  console.log("Bot İstatistiği")
  console.log(`Sunucu Sayısı: ${client.guilds.cache.size}`)
  console.log(`Kullanıcı Sayısı: ${toplamkulsayi}`)
  console.log(`Emoji Sayısı: ${client.emojis.cache.size}`)
  console.log(`Kanal Sayısı: ${client.channels.cache.size}`)

  console.log(" ")

  console.log(`${client.user.tag} olarak Discord'a giriş yaptım. Artık kullanmaya hazırım!\nNarcos Code İyi Kullanımlar Diler...`);


}
