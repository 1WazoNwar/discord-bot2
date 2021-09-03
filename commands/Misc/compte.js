const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const authPass = await client.getUser(message.member).catch(err => {
        console.error("Pas connectez. Faites e!auth");
    });
    if(!authPass){
        message.channel.send("Pas connectez. Faites e!auth")
    }

    const guildAuth = await client.getGuild(message.guild)
        if(!guildAuth) {
            return message.channel.send("**Serveur corompu!!!!\nVeuilly kick le bot et le re-inviter à cette adresse: https://discord.com/oauth2/authorize?client_id=837639493745246228&permissions=8&scope=bot\nSi le problème persiste veuillez rejoindre le serveur de support: https://discord.com/invite/nMk6kCcswX**")
        }

    let member= message.member;
    let user = member.user;

     let PPV = authPass.ppv;
    let PHOTOPP = authPass.photo;

    if(PPV == 'p') {
        PPV = "Publique."
    }
    if(PPV == 'pv') {
        PPV = "Priver."
    }
    if(PHOTOPP == 'p') {
        PHOTOPP = "Publique."
    }
    if(PHOTOPP == 'pv') {
        PHOTOPP = "Priver."
    }
     
   
     // Decrypt
     const compte = await client.connect(message.member).catch(err => {
        console.error("Mauvais identifiants ou pas connectez, faites e!auth");
    });
    if (!compte) {
        message.channel.send("**Mauvais identifiants ou non connectez. Faites e!auth**")
    }

    let prenom = compte.data.prenom;
    let nom = compte.data.nom;
    let lastco = compte.data.lastConnexion;
    let anneeScolaireCourant = compte.data.anneeScolaireCourante;
    let photo = compte.data.profile.photo;
    let classe = compte.classe;

    const embedPrincipal = new MessageEmbed()
        .setColor('#25ff')
        .setTitle(`__Le compte Ecole Directe de ${user.tag}__`)
        .setThumbnail(`http:${photo}`)
        .setDescription(`Affiche le compte Ecole Directe de ${user.tag}`)
        .setTimestamp()
        .setFooter('Ecole Directe | 🌐', 'https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
        .addFields(
            { name: `Prenom: `, value: prenom },
            { name: `Nom: `, value: nom },
            { name: `Année scolaire: `, value: anneeScolaireCourant },
            { name: `Classe: `, value: classe },
            { name: `Parametres: `, value: "**CI DESSOU**"},
            { name: `Confidentialités: `, value: PPV },
            { name: `Affiichage photo: `, value: PHOTOPP },
            { name: `Dernière connexion: `, value: lastco },

        );

        if(args[1] == 'p') {
            message.channel.send(embedPrincipal);
        }else {
            member.send(embedPrincipal)
            message.channel.send("`✔️` | Donnée envoyé en privé");
        }
}

module.exports.help = {
    name: "compte",
    category: "misc",
    description: "Permet d'afiicher son compte.",
};