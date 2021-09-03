const mongoose = require("mongoose");
const { User, Guild } = require("../models/index");
const CryptoJS = require("crypto-js");
const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();
require("dotenv").config();
const ALG = process.env.ALG;

module.exports = async client => {

  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    else return;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if(data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  }

  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild)
    const createGuild = await new Guild(merged);
    createGuild.save().then(g => console.log(`Nouveau serveur => ${g.guildName}`));
  }

  client.getUser = async user => {
    const data = await User.findOne({ userID: user.id });
    if (data) return data;
    else return;
  };

  client.connect = async user => {
    const data = await User.findOne({ userID: user.id });

    let usernameEncrypt = data.username;
    let passwordEncrypt = data.password;

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(usernameEncrypt, ALG);
    var usernameEC = bytes.toString(CryptoJS.enc.Utf8);

    var bytes = CryptoJS.AES.decrypt(passwordEncrypt, ALG);
    var passwordEC = bytes.toString(CryptoJS.enc.Utf8);
    const compte = await session.connexion(usernameEC, passwordEC)
    if (compte) return compte;
    else return;
  }
};