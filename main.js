const { Client, Collection } = require('discord.js');
const { loadEvents } = require("./util/loader");
const { readdirSync } = require("fs");
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

const client = new Client();
require("./util/functions")(client);
client.mongoose = require("./util/mongoose");
//client.commands, client.cooldowns
["commands", "cooldowns"].forEach(x => client[x] = new Collection());
const disbut = require('discord-buttons');

const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`Dossier Chargeée [🗂️] : ${getFileName.help.category}`)
            console.log(`Commande chargée [🛢️] : ${getFileName.help.name}`, "\n_______________________________________")
        };
    });
};

loadCommands();
loadEvents(client);
client.mongoose.init();

client.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    client.commands.get(command).run(client, message, args);
});

client.on('ready', () => {
    console.log(`${client.user.tag} observe les ${client.guilds.cache.map(g => g.
        memberCount).reduce((a, b) => a + b)} utilisateurs du serveur!`)

    const guild = [];
    client.guilds.cache.map(e => guild.push(e));
    guild.forEach(async g => {
        const data = await client.getGuild(g);
        if (!data) client.createGuild({ guildID: g.id, guildName: g.name, prime: "non", members: g.memberCount });
    })

    let activities = ['e!help', `avec ${client.guilds.cache.map(g => g.
        memberCount).reduce((a, b) => a + b)} utilisateurs`, `sur ${client.guilds.cache.size.toString()} serveurs`];

    setInterval(() => client.user.setPresence({ activity: { name: `${activities[Math.floor(Math.random() * activities.length)]}`, type: 'PLAYING' }, status: 'online' }), 3000);
});
client.login(process.env.TOKEN);