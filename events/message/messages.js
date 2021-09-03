const Discord = require("discord.js");
const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();
require('dotenv').config();
const ALG = process.env.ALG;



module.exports = async (client, message) => {
  const settings = await client.getGuild(message.guild);

  const updateGuild = await client.updateGuild(message.guild)
  const createGuild = await client.createGuild(message.guild)

  command.run(client, message, settings);
}