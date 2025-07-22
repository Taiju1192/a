const { Events, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    try {
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
          await command.execute(interaction, client);
        } catch (err) {
          console.error(`❌ コマンド実行中エラー: ${interaction.commandName}`);
          console.error(err);

          const replyPayload = {
            content: "⚠️ コマンド実行中にエラーが発生しました。",
            ephemeral: true,
          };

          if (!interaction.replied && !interaction.deferred) {
            await interaction.reply(replyPayload).catch(() => {});
          } else {
            await interaction.followUp(replyPayload).catch(() => {});
          }
        }
      }

      if (interaction.isButton()) {
        if (!interaction.guild || !interaction.member) {
          return interaction.reply({
            content: "⚠️ この操作はサーバー内でのみ使用できます。",
            ephemeral: true,
          });
        }

        const [prefix, roleId] = interaction.customId.split("-");
        if (prefix !== "verify") return;

        const role = interaction.guild.roles.cache.get(roleId);
        if (!role) {
          return interaction.reply({
            content: "❌ ロールが見つかりませんでした。",
            ephemeral: true,
          });
        }

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

          if (!interaction.replied) {
            await interaction.reply({
              content: "❌ ロールを付与できませんでした。",
              ephemeral: true,
            }).catch(() => {});
          }
        }
      }
    } catch (err) {
      console.error("❌ interactionCreate 全体エラー:", err);
    }
  },
};
