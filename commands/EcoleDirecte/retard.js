const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let member = message.member;
    let user = member.user;

    const guildAuth = await client.getGuild(message.guild)
        if(!guildAuth) {
            return message.channel.send("**Serveur corompu!!!!\nVeuilly kick le bot et le re-inviter à cette adresse: https://discord.com/oauth2/authorize?client_id=837639493745246228&permissions=8&scope=bot\nSi le problème persiste veuillez rejoindre le serveur de support: https://discord.com/invite/nMk6kCcswX**")
        }

    const compte = await client.connect(message.member).catch(err => {
        console.error("Mauvais identifiants ou pas connectez, faites e!auth");
    });
    if (!compte) {
        message.channel.send("**Mauvais identifiants ou non connectez. Faites e!auth**")
    }
  const vieScolaire = await compte.fetchVieScolaire();

  let tab = args[0];

  let type = vieScolaire.absencesRetards[tab].typeElement;
  let date = vieScolaire.absencesRetards[tab].displayDate;
  let libelle = vieScolaire.absencesRetards[tab].libelle;
  let motif = vieScolaire.absencesRetards[tab].motif;
  let justifieEd = vieScolaire.absencesRetards[tab].justifie;

  let nb = vieScolaire.absencesRetards.length - 1;

  if (args[0] > nb || !type) {
    return message.channel.send(`Ce message n'existe **pas**\nMessage(s) disponible(s)**:**\n**0** - **${nb}**`)
}

  if (justifieEd = true) {
    justifieEd = "Oui"
  } else {
    justifieEd = "Non"
  }



  const embedPrincipal = new MessageEmbed()
    .setColor('#25ff')
    .setTitle(`__Les retards de ${user.tag}__`)
    .setThumbnail('https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
    .setDescription(`Nombre de retards ${nb}`)
    .setTimestamp()
    .setFooter('Ecole Directe | 🌐', 'https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
    .addFields(
      { name: `Date: `, value: date },
      { name: `Type: `, value: type },
      { name: `Durée: `, value: libelle },
      { name: `Motif: `, value: motif },
      { name: `Justifié: `, value: justifieEd }
    );

    if(args[1] == 'p') {
      message.channel.send(embedFrancais);
  }else {
      member.send(embedFrancais)
      message.channel.send("`✔️` | Donnée envoyé en privé");
  }
};

module.exports.help = {
  name: "retard",
  category: "ecoledirecte",
  description: "Permet de recupéres ses retard.",
  usage: "<nombre>"
};