const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ComponentType
} = require('discord.js');

const timeoutDurations = {
  '1分': 60_000,
  '10分': 600_000,
  '30分': 1_800_000,
  '1時間': 3_600_000,
  '3時間': 10_800_000,
  '5時間': 18_000_000,
  '10時間': 36_000_000,
  '12時間': 43_200_000,
  '24時間': 86_400_000,
  '1週間': 604_800_000
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('ユーザーをタイムアウトします')
    .addUserOption(opt =>
      opt.setName('target')
        .setDescription('対象ユーザー')
        .setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('duration')
        .setDescription('時間')
        .setRequired(true)
        .addChoices(...Object.entries(timeoutDurations).map(([k, v]) => ({ name: k, value: String(v) })))
    )
    .addStringOption(opt =>
      opt.setName('reason')
        .setDescription('理由')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const member = interaction.options.getMember('target');
    const durationMs = parseInt(interaction.options.getString('duration'));
    const reason = interaction.options.getString('reason') || '理由なし';

    if (!member)
      return interaction.reply({ content: 'メンバーが見つかりません', ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle('⌛ タイムアウト確認')
      .setDescription(`${member} をタイムアウトしますか？`)
      .addFields(
        { name: '時間', value: `${durationMs / 60000} 分` },
        { name: '理由', value: reason }
      )
      .setColor('Yellow');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('confirm-timeout').setLabel('はい').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('cancel').setLabel('キャンセル').setStyle(ButtonStyle.Secondary)
    );

    const msg = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true, fetchReply: true });
    const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15_000 });

    collector.on('collect', async btn => {
      if (btn.user.id !== interaction.user.id) return;

      if (btn.customId === 'confirm-timeout') {
        try {
          await member.timeout(durationMs, reason);
          await btn.update({ content: `${member.user.tag} をタイムアウトしました`, embeds: [], components: [] });
        } catch {
          await btn.update({ content: '失敗しました', embeds: [], components: [] });
        }
      } else {
        await btn.update({ content: 'キャンセルしました', embeds: [], components: [] });
      }
    });
  }
};
