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

    const notes = await compte.fetchNotes()

    let periode = notes.periodes[tab].periode;
    let dateDebut = notes.periodes[tab].dateDebut;
    let dateFin = notes.periodes[tab].dateFin;
    let moyenneGenerale = notes.periodes[tab].ensembleMatieres.moyenneGenerale;
    let moyenneClasse = notes.periodes[tab].ensembleMatieres.moyenneClasse;
    let moyenneMin = notes.periodes[tab].ensembleMatieres.moyenneMin;
    let moyenneMax = notes.periodes[tab].ensembleMatieres.moyenneMax;
    let nomPP = notes.periodes[tab].ensembleMatieres.nomPP;

    let nb = notes.periodes.length - 1

    if (args[0] > nb || !periode) {
        return message.channel.send(`Ce message n'existe **pas**\nMessage(s) disponible(s)**:**\n**0** - **${nb}**`)
      }

     const embedFrancais = new MessageEmbed()
    .setColor('#25ff')
    .setTitle(`__Affiche la moyenne generale de ${user.tag}__`)
    .setThumbnail('https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
    .setDescription(`Nombre de relevé: ${nb}`)
    .setTimestamp()
    .setFooter('Ecole Directe | 🌐', 'https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
    .addFields(
        { name: 'Periode:', value: periode},
        { name: 'Date de commencement:', value: dateDebut},
        { name: 'Date de fin:', value: dateFin},
        { name: 'Nom du proffeseur principale:', value: nomPP},
        { name: 'Moyenne générale:', value: `${moyenneGenerale}/20`},
        { name: 'Moyenne de la classe:', value: `${moyenneClasse}/20`},
        { name: 'Moyenne min:', value: `${moyenneMin}/20`},
        { name: 'Moyenne max:', value: `${moyenneMax}/20`}
    ); 

    message.channel.send(embedFrancais);
    if(args[1] == 'p') {
        message.channel.send(embedFrancais);
    }else {
        member.send(embedFrancais)
        message.channel.send("`✔️` | Donnée envoyé en privé");
    }

    };

module.exports.help = {
    name: "moyenneg",
    category: "ecoledirecte",
    description: "Permet de savoir sa moyenne generale.",
    usage: "<nombre>"
};