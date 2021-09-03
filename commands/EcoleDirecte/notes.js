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


    let hist = notes.notes.filter((n) => n.codeMatiere == 'HI-GE');
    delete hist.splice((n) => n.codeMatiere == 'HI-GE');

    let fr = notes.notes.filter((n) => n.codeMatiere == 'FRANC');
    var removedItem2 = fr.splice((n) => n.codeMatiere == 'FRANC');

    let ang = notes.notes.filter((n) => n.codeMatiere == 'AGL1');
    delete ang.splice((n) => n.codeMatiere == 'AGL1');



    let nb = notes.notes.length - 1;

    if (args[0] > nb || !args[0]) {
        return message.channel.send(`Ce message n'existe **pas**\nMessage(s) disponible(s)**:**\n**0** - **${nb}**`)
      }

    const embedPrincipal = new MessageEmbed()
    .setColor('#25ff')
    .setTitle(`__Affiche les notes de Français de ${user.tag}__`)
    .setThumbnail('https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
    .setDescription(`Nombres de notes: ${nb}`)
    .setTimestamp()
    .setFooter('Ecole Directe | 🌐', 'https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
    .addFields(
        { name: 'Français:', value: "!notesfr"},
		{ name: 'Mathematique:', value: "!notesmath"},
		{ name: 'Histoire:', value: "!noteshigo"},
		{ name: 'Anglais:', value: `!notesang`, inline: true },
		{ name: 'Allemand:', value: `!notesall`, inline: false },
        { name: 'Physique:', value: `!notesph`, inline: false },
		{ name: 'SVT:', value: `!notessvt`, inline: false },
        )

    

    if(!tab) {
        message.channel.send(embedPrincipal);
        if(args[1] == 'p') {
            message.channel.send(embedPrincipal);
        }else {
            member.send(embedPrincipal)
            message.channel.send("`✔️` | Donnée envoyé en privé");
        }
    }else{
        const notes = await compte.fetchNotes();


    let devoir = notes.notes[tab].devoir;
    let typeDevoir = notes.notes[tab].typeDevoir;
    let noteSur = notes.notes[tab].noteSur;
    let valeur = notes.notes[tab].valeur;
    let moyenneClasse = notes.notes[tab].moyenneClasse;
    let date = notes.notes[tab].date;
    let min = notes.notes[tab].minClasse;
    let max = notes.notes[tab].maxClasse;
    let libelleMatiere = notes.notes[tab].libelleMatiere;

        const embedNotes = new MessageEmbed()
    .setColor('#25ff')
    .setTitle(`__Affiche les notes de Français de ${user.tag}__`)
    .setThumbnail('https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
    .setDescription(`Nombres de notes: ${nb}`)
    .setTimestamp()
    .setFooter('Ecole Directe | 🌐', 'https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
    .addFields(
        { name: 'Mattieres:', value: libelleMatiere},
		{ name: 'Evaluation:', value: devoir},
		{ name: 'Type:', value: typeDevoir},
		{ name: 'Notes:', value: `${valeur}/${noteSur}`, inline: false },
		{ name: 'Moyenne de la classe:', value: `${moyenneClasse}/${noteSur} (Min: ${min} , Max : ${max} )`, inline: false },
        { name: 'Date', value: date, inline: false },
    );
        
    if(args[1] == 'p') {
        message.channel.send(embedNotes);
    }else {
        member.send(embedNotes)
        message.channel.send("`✔️` | Donnée envoyé en privé");
    }
    } 
}; 

module.exports.help = {
    name: "notes",
    category: "ecoledirecte",
    description: "Permet de recupéres ses notes.",
    usage: "<nombre>",
    cooldowns: '5',
    args: 'true'
};