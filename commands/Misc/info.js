const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    let member = message.member;

    const guildAuth = await client.getGuild(message.guild)
    if (!guildAuth) {
        return message.channel.send("**Serveur corompu!!!!\nVeuilly kick le bot et le re-inviter à cette adresse: https://discord.com/oauth2/authorize?client_id=837639493745246228&permissions=8&scope=bot\nSi le problème persiste veuillez rejoindre le serveur de support: https://discord.com/invite/nMk6kCcswX**")
    }

    let server = message.guild.name;
    let prime = guildAuth.prime;

    const embedPrincipal = new MessageEmbed()
        .setColor('#25ff')
        .setTitle(`__Le compte Ecole Directe de__`)
        .setThumbnail(``)
        .setDescription(`Affiche le compte Ecole Directe de `)
        .setTimestamp()
        .setFooter('Ecole Directe | 🌐', 'https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
        .addFields(
            { name: `Serveur: `, value: server },
            { name: `Prenium:`, value: prime }
        );

    if (args[0] == 'p') {
        message.channel.send(embedPrincipal);
    } else {
        member.send(embedPrincipal)
        message.channel.send("`✔️` | Donnée envoyé en privé");
    }
}

module.exports.help = {
    name: "info",
    category: "misc",
    description: "Voir les infos du serveur.",
};