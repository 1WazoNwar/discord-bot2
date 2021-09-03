module.exports = async (client, guild) => {
    const newGuild = {
        guildID: guild.id,
        guildName: guild.name,
        prime: "non",
        members: guild.memberCount
    };
    await client.createGuild(newGuild);
};