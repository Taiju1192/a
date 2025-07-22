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
    .setName('kick')
    .setDescription('ユーザーをキックします')
    .addUserOption(opt =>
      opt.setName('target')
        .setDescription('キック対象')
        .setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('reason')
        .setDescription('理由')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || '理由なし';

    if (!target)
      return interaction.reply({ content: 'ユーザーが見つかりません', ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle('⚠️ キック確認')
      .setDescription(`${target} をキックしてよろしいですか？`)
      .addFields({ name: '理由', value: reason })
      .setColor('Orange');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('confirm-kick').setLabel('はい').setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setCustomId('cancel').setLabel('キャンセル').setStyle(ButtonStyle.Secondary)
    );

    const msg = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true, fetchReply: true });

    const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15_000 });

    collector.on('collect', async btn => {
      if (btn.user.id !== interaction.user.id)
        return btn.reply({ content: '実行者のみ操作できます', ephemeral: true });

      if (btn.customId === 'confirm-kick') {
        try {
          await target.kick(reason);
          await btn.update({ content: `${target.user.tag} をキックしました`, embeds: [], components: [] });
        } catch {
          await btn.update({ content: 'キックに失敗しました', embeds: [], components: [] });
        }
      } else {
        await btn.update({ content: 'キャンセルされました', embeds: [], components: [] });
      }
    });
  }
};
