const {
  Events,
  EmbedBuilder,
  PermissionFlagsBits,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const activeTicketUsers = new Set();
const activeTicketChannels = new Set();
const deletedChannels = new Set();
const logChannelId = '1396441885442310186'; // ログ送信先チャンネルID
const logEnabledGuildId = '1396396963292905523'; // ログを出す対象サーバーID

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    // 🎫 チケット作成ボタン
    if (
      interaction.isButton() &&
      interaction.customId.startsWith('ticket-') &&
      !interaction.customId.startsWith('ticket-close-')
    ) {
      const userId = interaction.user.id;
      if (activeTicketUsers.has(userId)) return;
      activeTicketUsers.add(userId);

      const existing = interaction.guild.channels.cache.find(c =>
        c.name.includes(`（${interaction.user.username}）`) &&
        c.name.startsWith('🎫｜')
      );
      if (existing) {
        await interaction.reply({
          content: '⚠️ 既にあなたのチケットが存在します：<#' + existing.id + '>',
          ephemeral: true
        });
        activeTicketUsers.delete(userId);
        return;
      }

      try {
        if (!interaction.deferred && !interaction.replied) {
          await interaction.deferUpdate().catch(() => {});
        }

        const [, , categoryId, roleId, userIdMeta, adminRoleId] =
          interaction.customId.split('-');

        const guild = interaction.guild;
        const category =
          guild.channels.cache.get(categoryId) ||
          guild.channels.cache.find(c => c.type === ChannelType.GuildCategory);
        const role = guild.roles.cache.get(roleId);
        const user = guild.members.cache.get(userIdMeta);
        const adminRole = guild.roles.cache.get(adminRoleId);
        const everyone = guild.roles.everyone;

        const displayName = interaction.member.displayName.replace(/[^a-zA-Z0-9ぁ-んァ-ン一-龥()（）ー・\-\_\s]/g, '');
        const channelName = `🎫｜${displayName}（${interaction.user.username}）`.slice(0, 100);

        const channel = await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: category?.id,
          permissionOverwrites: [
            {
              id: everyone.id,
              deny: [PermissionFlagsBits.ViewChannel]
            },
            {
              id: interaction.user.id,
              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
            },
            ...(adminRole ? [{
              id: adminRole.id,
              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels]
            }] : []),
            ...guild.members.cache
              .filter(m => m.permissions.has(PermissionFlagsBits.Administrator))
              .map(m => ({
                id: m.id,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
              }))
          ]
        });

        const mentions = [
          `<@${interaction.user.id}>`,
          role ? `<@&${role.id}>` : null,
          user ? `<@${user.id}>` : null
        ].filter(Boolean).join(' ');

        const embed = new EmbedBuilder()
          .setTitle('📉 お問い合わせ')
          .setDescription('お問い合わせありがとうございます。\n内容を送信後、管理者をお待ちください。')
          .setColor(0x2ecc71)
          .setTimestamp();

        const deleteButton = new ButtonBuilder()
          .setCustomId(`ticket-close-${interaction.user.id}-${adminRole?.id || 'null'}`)
          .setLabel('チケット削除')
          .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(deleteButton);

        await channel.send({ content: mentions, embeds: [embed], components: [row] });

        // ✅ ログチャンネルに作成通知（特定のサーバーのみ）
        if (interaction.guild.id === logEnabledGuildId) {
          const logChannel = client.channels.cache.get(logChannelId);
          if (logChannel?.isTextBased()) {
            const openLog = new EmbedBuilder()
              .setTitle('🎫 チケット作成')
              .setDescription(`👤 <@${interaction.user.id}> が \`${channel.name}\` を作成しました。\n📅 ${timestampString()}`)
              .setColor(0x00bfff)
              .setTimestamp();

            await logChannel.send({ embeds: [openLog] });
          }
        }

      } catch (err) {
        console.error('❌ チケット作成エラー:', err);
      } finally {
        activeTicketUsers.delete(userId);
      }
    }

    // 🗑 チケット削除ボタン
    if (interaction.isButton() && interaction.customId.startsWith('ticket-close-')) {
      const channelId = interaction.channelId;
      if (activeTicketChannels.has(channelId) || deletedChannels.has(channelId)) return;
      activeTicketChannels.add(channelId);

      try {
        if (!interaction.deferred && !interaction.replied) {
          await interaction.deferUpdate().catch(() => {});
        }

        const [, , ticketOwnerId, adminRoleId] = interaction.customId.split('-');
        const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
        const hasAdminRole = adminRoleId !== 'null' && interaction.member.roles.cache.has(adminRoleId);

        if (!(isAdmin || hasAdminRole)) return;

        const notifyEmbed = new EmbedBuilder()
          .setTitle('🗑 チャンネル削除')
          .setDescription('このチャンネルは `1秒後` に削除されます。')
          .setColor(0xffcc00)
          .setTimestamp();

        await interaction.channel.send({ embeds: [notifyEmbed] });

        // ❌ ログ送信（特定サーバーのみ）
        if (interaction.guild.id === logEnabledGuildId) {
          const logChannel = client.channels.cache.get(logChannelId);
          if (logChannel?.isTextBased()) {
            const closeLog = new EmbedBuilder()
              .setTitle('❌ チケット削除')
              .setDescription(`👮 <@${interaction.user.id}> が \`${interaction.channel.name}\` を削除しました。\n📅 ${timestampString()}`)
              .setColor(0xff5555)
              .setTimestamp();

            await logChannel.send({ embeds: [closeLog] });
          }
        }

        setTimeout(async () => {
          if (!deletedChannels.has(channelId)) {
            deletedChannels.add(channelId);
            await interaction.channel?.delete().catch(err => {
              console.error('❌ チャンネル削除失敗:', err.message);
            });
          }
        }, 1000);
      } catch (err) {
        console.error('❌ チケット削除エラー:', err);
      } finally {
        activeTicketChannels.delete(channelId);
      }
    }
  }
};

// 📅 タイムスタンプ整形関数
function timestampString(date = new Date()) {
  return `${date.getFullYear()}\u5e74${pad(date.getMonth() + 1)}\u6708${pad(date.getDate())}\u65e5 ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function pad(n) {
  return n.toString().padStart(2, '0');
}
