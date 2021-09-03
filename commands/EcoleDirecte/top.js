const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild);
    if (settings.prime = "non") {
        message.channel.send("Le serveur sur lequelle vous etes n'a pas la version **PRIME** du bot\nVeuillez l'acheter à cette adresse: ")
    } else {
        let member = message.member;
        let user = member.user;

        const guildAuth = await client.getGuild(message.guild)
        if (!guildAuth) {
            return message.channel.send("**Serveur corompu!!!!\nVeuilly kick le bot et le re-inviter à cette adresse: https://discord.com/oauth2/authorize?client_id=837639493745246228&permissions=8&scope=bot\nSi le problème persiste veuillez rejoindre le serveur de support: https://discord.com/invite/nMk6kCcswX**")
        }

        const compte = await client.connect(message.member).catch(err => {
            console.error("Mauvais identifiants ou pas connectez, faites e!auth");
        });
        if (!compte) {
            message.channel.send("**Mauvais identifiants ou non connectez. Faites e!auth**")
        }

        const notes = await compte.fetchNotes();
        const notes2 = notes.notes;

        const embed = new MessageEmbed()
            .setColor('#25ff')
            .setTitle(`__Top 10 des notes de ${user.tag}__`)
            .setThumbnail('https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
            .setTimestamp()
            .setFooter('Ecole Directe | 🌐', 'https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')

        notes2.sort((a, b) => (a.valeur < b.valeur) ? 1 : -1).splice(0, 10).
            forEach(e => {
                embed.addField(e.devoir, `${e.valeur}/${e.noteSur}`);
            });

        //let abs = notes.notes.filter((n) => n.valeur == '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '14', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25').map((v) => v)

        if (args[0] == 'p') {
            message.channel.send(embed);
        } else {
            member.send(embed)
            message.channel.send("`✔️` | Donnée envoyé en privé");
        }

        // message.channel.send("Commande en cour de **Developement**/**Maintenance**.")
    }
}

module.exports.help = {
    name: "top",
    category: "ecoledirecte",
    description: "Affiche le top 10 de ses notes.",
    cooldowns: '5',
    args: 'false'
}