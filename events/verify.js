const { Events, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    // スラッシュコマンド処理
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (err) {
        console.error(`❌ コマンド実行中エラー: ${interaction.commandName}`);
        console.error(err);

        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({
            content: "⚠️ コマンド実行中にエラーが発生しました。",
            ephemeral: true,
          });
        } else {
          await interaction.followUp({
            content: "⚠️ コマンド実行中にエラーが発生しました。",
            ephemeral: true,
          });
        }
      }
    }

    // ボタン処理（例: verify-ロールID）
    if (interaction.isButton()) {
      const [prefix, roleId] = interaction.customId.split("-");

      if (prefix !== "verify") return;

      const role = interaction.guild.roles.cache.get(roleId);
      if (!role) {
        return interaction.reply({
          content: "❌ ロールが見つかりませんでした。",
          ephemeral: true,
        });
      }

      // すでにロールを持っていないかチェック
      if (interaction.member.roles.cache.has(role.id)) {
        return interaction.reply({
          content: "✅ すでに認証済みです。",
          ephemeral: true,
        });
      }

      try {
        await interaction.member.roles.add(role);

        const embed = new EmbedBuilder()
          .setTitle("✅ 認証完了")
          .setDescription(`\`${role.name}\` を付与しました！`)
          .setColor(Colors.Green)
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setFooter({
            text: `${interaction.user.username} さん`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          });

        await interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
      } catch (err) {
        console.error("❌ ロール付与失敗:", err);

        try {
          await interaction.reply({
            content: "❌ ロールを付与できませんでした。",
            ephemeral: true,
          });
        } catch {
          console.warn("⚠️ 二重応答防止：すでに応答済み");
        }
      }
    }
  }
};
