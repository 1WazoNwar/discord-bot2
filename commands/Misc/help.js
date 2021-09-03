const {MessageEmbed} = require("discord.js");
require('dotenv').config();
const PREFIX = process.env.PREFIX;
const {readdirSync} = require('fs')
const categoryList = readdirSync('./commands');


module.exports.run = async (client, message, args) => {
    const guildAuth = await client.getGuild(message.guild)
        if(!guildAuth) {
            return message.channel.send("**Serveur corompu!!!!\nVeuilly kick le bot et le re-inviter à cette adresse: https://discord.com/oauth2/authorize?client_id=837639493745246228&permissions=8&scope=bot\nSi le problème persiste veuillez rejoindre le serveur de support: https://discord.com/invite/nMk6kCcswX**")
        }
    
    if (!args.length) {
        const embed = new MessageEmbed()
            .setColor("#25ff")
            .addField("Liste des commandes", `Une liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, **tapez**: 
            \`${PREFIX}help <command_name>\`.`)

        for (const category of categoryList) {
            embed.addField(
                `${category}`,
                `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).
                join(', ')}`
            )
        }
        return message.channel.send(embed);
    } else {
        const command = client.commands.get(args[0])

        const embed = new MessageEmbed()
            .setColor("#25ff")
            .setTitle(`\`${command.help.name}\``)
            .addField("Description", `${command.help.description}`)
            .addField("Cooldown", command.help.cooldown ? `${command.help.cooldowns} secs`  : `0 secs`)
            .addField("Utilisation", command.help.usage ? `${PREFIX}${command.help.name} ${command.help.usage}` : `${PREFIX}${command.help.name}`, true)
        return message.channel.send(embed);
    }
};

module.exports.help = {
    name: "help",
    category: "misc",
    description: "Voir la liste des commandes.",
    cooldowns: '0',
    usage: '<command_name>',
    args: "true"
};