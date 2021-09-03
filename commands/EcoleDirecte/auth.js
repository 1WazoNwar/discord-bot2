const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let member = message.member;
    let user = member.user;

    const guildAuth = await client.getGuild(message.guild)
        if(!guildAuth) {
            return message.channel.send("**Serveur corompu!!!!\nVeuilly kick le bot et le re-inviter à cette adresse: https://discord.com/oauth2/authorize?client_id=837639493745246228&permissions=8&scope=bot\nSi le problème persiste veuillez rejoindre le serveur de support: https://discord.com/invite/nMk6kCcswX**")
        }
    
    member.send(`Votre userID: **${user.id}**`)
    member.send("Site: **https://ecole-directe-site.herokuapp.com/**")
    message.channel.send("`✔️` | Donnée envoyé en privé");
};

module.exports.help = {
    name: "auth",
    category: "ecoledirecte",
    description: "Permet d'authentifié les utilitaseur à EcoleDirecte"
};