const { Client, MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Users = require("../../models/user")

mongoose.set('useFindAndModify', false);
module.exports.run = async (client, message, args) => {
    const authPass = await client.getUser(message.member).catch(err => {
        console.error("Pas connectez. Faites e!auth");
    });
    if (!authPass) {
        message.channel.send("Pas connectez. Faites e!auth")
    }

    const guildAuth = await client.getGuild(message.guild)
        if(!guildAuth) {
            return message.channel.send("**Serveur corompu!!!!\nVeuilly kick le bot et le re-inviter à cette adresse: https://discord.com/oauth2/authorize?client_id=837639493745246228&permissions=8&scope=bot\nSi le problème persiste veuillez rejoindre le serveur de support: https://discord.com/invite/nMk6kCcswX**")
        }

    let member = message.member;
    let user = member.user;

    let PPV = authPass.ppv;
    let PHOTO = authPass.photo;

    if(PPV == 'p') {
        PPV = "Publique."
    }
    if(PPV == 'pv') {
        PPV = "Priver."
    }
    if(PHOTO == 'p') {
        PHOTO = "Publique."
    }
    if(PHOTO == 'pv') {
        PHOTO = "Priver."
    }
    
    const embed = new MessageEmbed()
        .setColor('#25ff')
        .setTitle(`__La configuration du compte Ecole Directe de ${user.tag}__`)
        .setThumbnail("")
        .setDescription(`**Confidentialités**: Envois vos notes, etc en privé par defaut.\n**Photo**: affiche votre photo sur en haut à droite de vos notes.`)
        .setTimestamp()
        .setFooter('Ecole Directe | 🌐', 'https://cdn.discordapp.com/attachments/779466058171154483/842742558354571274/logo_ecole_directe2.jpg')
        .addFields(
            { name: `Confidentialités: `, value: PPV },
            { name: `Modification: `, value: "e!config ppv pv or p" },
            { name: `Photo: `, value: PHOTO },
            { name: `Modification: `, value: "e!config photo pv or p" },
        );

    if(!args[0] || !args[1]) {
        member.send(embed)
        message.channel.send("`✔️` | Donnée envoyé en privé");
    }

    if (await Users.findOne({ userID: user.id })) {
        async function mergedPhoto() {
            console.log('merged')
            const filter = { userID: user.id };
            const update = { photo: args[1]};
    
            let doc = await Users.findOneAndUpdate(filter, update, {
                new: true
            })
        }
    
        async function mergedPPV() {
            console.log('merged')
            const filter = { userID: user.id };
            const update = { ppv: args[1]};
    
            let doc = await Users.findOneAndUpdate(filter, update, {
                new: true
            })
        }
    
        if (args[0] == "ppv" && args[1] == "p") {
            console.log("confidentialité p")
            mergedPPV();
            message.channel.send("`✔️` | Donnée bien mise à jour");
        }
        if (args[0] == "ppv" && args[1] == "pv") {
            console.log("confidentialité pv")
            mergedPPV();
            message.channel.send("`✔️` | Donnée bien mise à jour");
        }
    
        if (args[0] == "photo" && args[1] == "p") {
            console.log("photo public")
            mergedPhoto();
            message.channel.send("`✔️` | Donnée bien mise à jour");
        }
        if (args[0] == "photo" && args[1] == "pv") {
            console.log("photo priver")
            mergedPhoto();
            message.channel.send("`✔️` | Donnée bien mise à jour");
        }
    }

};

module.exports.help = {
    name: "config",
    category: "misc",
    description: "Permet de configurer son compte.",
    usage: ""
};