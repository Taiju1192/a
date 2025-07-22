const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("music-setting")
    .setDescription("音楽再生の設定を変更します"),

  async execute(interaction) {
    try {
      // ✅ 3秒ルール対策：即 deferReply
      await interaction.deferReply({ ephemeral: true });

      const menu = new StringSelectMenuBuilder()
        .setCustomId("music_settings")
        .setPlaceholder("設定を選択してください")
        .addOptions([
          {
            label: "音量を変更",
            value: "volume",
            emoji: "🔊"
          },
          {
            label: "リピート切替",
            value: "repeat",
            emoji: "🔁"
          },
          {
            label: "キューをシャッフル",
            value: "shuffle",
            emoji: "🔀"
          }
        ]);

      const row = new ActionRowBuilder().addComponents(menu);

      await interaction.editReply({
        content: "🎵 設定を選んでください：",
        components: [row]
      });

    } catch (err) {
      console.error("❌ music-setting.js エラー:", err);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "⚠ 設定メニューの表示に失敗しました。",
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: "⚠ 設定メニューの表示に失敗しました。",
          ephemeral: true
        });
      }
    }
  }
};
