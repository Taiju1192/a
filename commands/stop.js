const { SlashCommandBuilder } = require("discord.js");
const activePlayers = require("../activePlayers");



module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("音楽再生を停止し、ボイスチャンネルから退出します"),

  async execute(interaction) {
    const guildId = interaction.guild.id;

    // 共有Mapから再生情報を取得
    const playerData = activePlayers.get(guildId);
    if (!playerData) {
      return interaction.reply({ content: "現在再生中の曲はありません。", ephemeral: true });
    }

    playerData.player.stop();
    playerData.connection.destroy();
    activePlayers.delete(guildId);

    await interaction.reply("⏹️ 再生を停止し、ボイスチャンネルから退出しました。");
  }
};
