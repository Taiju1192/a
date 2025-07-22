const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ComponentType
} = require('discord.js');

const LOG_SERVER_ID = '1396396963292905523';
const LOG_CHANNEL_ID = '1396689190946738206';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('指定したユーザーをBANします')
    .addUserOption(opt => opt.setName('target').setDescription('BANするユーザー').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('理由'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || '理由なし';

    const confirmEmbed = new EmbedBuilder()
      .setTitle('🚨 BAN確認')
      .setDescription(`本当に ${target} をBANしますか？`)
      .addFields({ name: '理由', value: reason })
      .setColor('Red');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('confirm-ban').setLabel('はい').setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setCustomId('cancel').setLabel('キャンセル').setStyle(ButtonStyle.Secondary)
    );

    const msg = await interaction.reply({ embeds: [confirmEmbed], components: [row], ephemeral: true, fetchReply: true });

    const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15_000 });

    collector.on('collect', async btn => {
      if (btn.user.id !== interaction.user.id)
        return btn.reply({ content: '実行者のみ操作できます', ephemeral: true });

      if (btn.customId === 'confirm-ban') {
        try {
          await interaction.guild.members.ban(target.id, { reason });
          await btn.update({ content: `${target.tag} をBANしました`, embeds: [], components: [] });

          if (interaction.guild.id === LOG_SERVER_ID) {
            const log = new EmbedBuilder()
              .setTitle('🔨 ユーザーBAN')
              .setDescription(`ユーザー <@${target.id}> がBANされました`)
              .addFields(
                { name: '理由', value: reason },
                { name: '実行者', value: `<@${interaction.user.id}>` }
              )
              .setColor('DarkRed')
              .setTimestamp();
            const logChannel = interaction.client.channels.cache.get(LOG_CHANNEL_ID);
            if (logChannel?.isTextBased()) logChannel.send({ embeds: [log] });
          }
        } catch (e) {
          await btn.update({ content: 'BANに失敗しました', embeds: [], components: [] });
        }
      } else {
        await btn.update({ content: 'キャンセルされました', embeds: [], components: [] });
      }
    });
  }
};
