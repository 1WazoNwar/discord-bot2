const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
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
    const messagerie = await compte.fetchMessagerie();

    let tab = args[0];
    let nb = messagerie.messages.received.length - 1;

    

    let type = messagerie.messages.received[tab].mtype;
    let lu = messagerie.messages.received[tab].read;
    let subject = messagerie.messages.received[tab].subject;
    let content = messagerie.messages.received[tab].content;
    let date = messagerie.messages.received[tab].date;
    let from = messagerie.messages.received[tab].from.name;
    
    if (args[0] > nb || !type) {
        return message.channel.send(`Ce message n'existe **pas**\nMessage(s) disponible(s)**:**\n**0** - **${nb}**`)
    }

    if (type = 'received') {
        type = "Reçus."
    }
    if (lu = true) {
        lu = "Oui."
    } else {
        lu = "Non."
    }


    const embed = new MessageEmbed()
        .setColor('#25ff')
        .setTitle(`__Affiche le(s) message(s) de ${user.tag}__`)
        .setThumbnail('https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
        .setDescription(`Nombre(s) de message(s): 0 - ${nb}`)
        .setTimestamp()
        .setFooter('Ecole Directe | 🌐', 'https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
        .addFields(
            { name: 'Type:', value: type },
            { name: 'Lu:', value: lu },
            { name: 'Sujet:', value: subject },
            { name: 'Contenue:', value: content ? `${content}` : `Inconnue.` },
            { name: 'De:', value: from },
            { name: 'Date:', value: date },
        );

    if (args[1] == 'p') {
        message.channel.send(embed);
    } else {
        member.send(embed)
        message.channel.send("`✔️` | Donnée envoyé en privé");
    }

};

module.exports.help = {
    name: "mess",
    category: "ecoledirecte",
    description: "Permet de regarder ses message EcoleDirecte.",
    usage: "<nombre>"
};