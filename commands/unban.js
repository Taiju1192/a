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
    .setName('unban')
    .setDescription('ユーザーのBANを解除します')
    .addStringOption(opt =>
      opt.setName('userid')
        .setDescription('BANを解除するユーザーID')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const userId = interaction.options.getString('userid');

    const embed = new EmbedBuilder()
      .setTitle('🛡️ BAN解除確認')
      .setDescription(`<@${userId}> のBANを解除しますか？`)
      .setColor('Green');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('confirm-unban').setLabel('はい').setStyle(ButtonStyle.Success),
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

      if (btn.customId === 'confirm-unban') {
        try {
          await interaction.guild.members.unban(userId);
          await btn.update({ content: `<@${userId}> のBANを解除しました。`, embeds: [], components: [] });
        } catch {
          await btn.update({ content: 'BAN解除に失敗しました。IDを確認してください。', embeds: [], components: [] });
        }
      } else {
        await btn.update({ content: 'キャンセルされました。', embeds: [], components: [] });
      }
    });
  }
};
