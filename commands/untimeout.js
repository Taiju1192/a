const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ComponentType
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('untimeout')
    .setDescription('タイムアウトを解除します')
    .addUserOption(opt =>
      opt.setName('target')
        .setDescription('対象ユーザー')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const member = interaction.options.getMember('target');
    if (!member)
      return interaction.reply({ content: 'メンバーが見つかりません', ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle('⏱️ タイムアウト解除確認')
      .setDescription(`${member} のタイムアウトを解除しますか？`)
      .setColor('Green');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('confirm-untimeout').setLabel('はい').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('cancel').setLabel('キャンセル').setStyle(ButtonStyle.Secondary)
    );

    const msg = await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true,
      fetchReply: true
    });

    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 15_000
    });

    collector.on('collect', async btn => {
      if (btn.user.id !== interaction.user.id)
        return btn.reply({ content: '実行者のみ操作できます。', ephemeral: true });

      if (btn.customId === 'confirm-untimeout') {
        try {
          await member.timeout(null);
          await btn.update({ content: `${member.user.tag} のタイムアウトを解除しました。`, embeds: [], components: [] });
        } catch {
          await btn.update({ content: '解除に失敗しました。', embeds: [], components: [] });
        }
      } else {
        await btn.update({ content: 'キャンセルされました。', embeds: [], components: [] });
      }
    });
  }
};
