const {Client, MessageEmbed} = require("discord.js");

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
    let tab = args[0];
 //   let ppv = args[1];

    const notes = await compte.fetchNotes();

    let frNotes = notes.notes.filter((n) => n.codeMatiere == 'MATHS').map((v) => v.valeur)
    let frDevoir = notes.notes.filter((n) => n.codeMatiere == 'MATHS').map((v) => v.devoir)
    let frTypeDevoir = notes.notes.filter((n) => n.codeMatiere == 'MATHS').map((v) => v.typeDevoir)
    let frnoteSur = notes.notes.filter((n) => n.codeMatiere == 'MATHS').map((v) => v.noteSur)
    let frMoyenneClasse = notes.notes.filter((n) => n.codeMatiere == 'MATHS').map((v) => v.moyenneClasse)
    let frmin = notes.notes.filter((n) => n.codeMatiere == 'MATHS').map((v) => v.minClasse)
    let frmax = notes.notes.filter((n) => n.codeMatiere == 'MATHS').map((v) => v.maxClasse)
    let frlibelleMatiere = notes.notes.filter((n) => n.codeMatiere == 'MATHS').map((v) => v.libelleMatiere)
    let frDate = notes.notes.filter((n) => n.codeMatiere == 'MATHS').map((v) => v.date)

    let nb = frDevoir.length - 1;

    if (args[0] > nb || !type) {
        return message.channel.send(`Ce message n'existe **pas**\nMessage(s) disponible(s)**:**\n**0** - **${nb}**`)
    }

    const embedFrancais = new MessageEmbed()
    .setColor('#25ff')
    .setTitle(`__Affiche les notes de Mathematiques de ${user.tag}__`)
    .setThumbnail('https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
    .setDescription(`Nombre de notes: ${nb}`)
    .setTimestamp()
    .setFooter('Ecole Directe | 🌐', 'https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
    .addFields(
        { name: 'Mattieres:', value: frlibelleMatiere[tab]},
		{ name: 'Evaluation:', value: frDevoir[tab]},
		{ name: 'Type:', value: frTypeDevoir[tab]},
		{ name: 'Notes:', value: `${frNotes[tab]}/${frnoteSur[tab]}`, inline: false },
		{ name: 'Moyenne de la classe:', value: `${frMoyenneClasse[tab]}/${frnoteSur[tab]} (Min: ${frmin[tab]} , Max : ${frmax[tab]} )`, inline: false },
        { name: 'Date', value: frDate[tab], inline: false },
    );

    if(args[1] == 'p') {
        message.channel.send(embedFrancais);
    }else {
        member.send(embedFrancais)
        message.channel.send("`✔️` | Donnée envoyé en privé");
    }
}; 

module.exports.help = {
    name: "notesmath",
    category: "ecoledirecte",
    description: "Permet de recupéres ses notes de mathematiques.",
    usage: "<nombre>"
};