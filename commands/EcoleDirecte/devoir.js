const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let member = message.member;
  let user = member.user;

  const compte = await client.connect(message.member).catch(err => {
    console.error("Mauvais identifiants ou pas connecté, faites e!auth");
  });
  if (!compte) {
    message.channel.send("**Mauvais identifiants ou non connectez. Faites e!auth**")
  }

  let tab = args[0];

  const cahierDeTexte = await compte.fetchCahierDeTexte();

  let nb = cahierDeTexte.length - 1
  if (args[0] > nb || !args[0]) {
    return message.channel.send(`Ce message n'existe **pas**\nMessage(s) disponible(s)**:**\n**0** - **${nb}**`)
  }

  let Devoirs = cahierDeTexte.devoirs;

  if (Devoirs == undefined) {
    message.channel.send("**Pas de devoir pour aujourd'hui.**\n🏖️***Vacance***🏖️")
  } else {
    console.log(cahierDeTexte.devoirs)
  }
};

module.exports.help = {
  name: "devoirs",
  category: "ecoledirecte",
  description: "Permet de recupéres ses devoirs.",
  usage: "<nombre>"
};