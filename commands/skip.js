const { SlashCommandBuilder } = require("discord.js");
const activePlayers = require("../activePlayers");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("現在の曲をスキップします"),

  async execute(interaction) {
    const guildId = interaction.guild.id;
    const playerData = activePlayers.get(guildId);
    if (!playerData) return interaction.reply("⚠️ 再生中の曲がありません。");

    playerData.player.stop(true);
    await interaction.reply("⏭ 曲をスキップしました。");
  }
};
