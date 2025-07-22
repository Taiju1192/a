const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('チケットパネルを送信します')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(opt =>
      opt.setName('title')
        .setDescription('パネルのタイトル')
    )
    .addStringOption(opt =>
      opt.setName('description')
        .setDescription('パネルの説明')
    )
    .addAttachmentOption(opt =>
      opt.setName('image')
        .setDescription('埋め込み画像')
    )
    .addStringOption(opt =>
      opt.setName('button')
        .setDescription('ボタンのラベル')
    )
    .addChannelOption(opt =>
      opt.setName('category')
        .setDescription('チケットを作成するカテゴリー')
        .addChannelTypes(ChannelType.GuildCategory)
    )
    .addRoleOption(opt =>
      opt.setName('role')
        .setDescription('通知対象のロール（メンション）')
    )
    .addUserOption(opt =>
      opt.setName('user')
        .setDescription('通知対象のユーザー（メンション）')
    )
    .addRoleOption(opt =>
      opt.setName('adminrole')
        .setDescription('チケットを削除できる管理ロール')
    ),

  async execute(interaction) {
    // 実行者が管理者権限を持っているかチェック
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ このコマンドは管理者のみ使用できます。',
        ephemeral: true
      });
    }

    const title = interaction.options.getString('title') || 'チケットパネル';
    const description = interaction.options.getString('description') || '下のボタンを押すとチケットを発行します。';
    const image = interaction.options.getAttachment('image');
    const buttonLabel = interaction.options.getString('button') || '発行';
    const category = interaction.options.getChannel('category');
    const role = interaction.options.getRole('role');
    const user = interaction.options.getUser('user');
    const adminRole = interaction.options.getRole('adminrole');

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(0x3498db)
      .setTimestamp();

    if (image && image.contentType?.startsWith('image')) {
      embed.setImage(image.url);
    }

    const ticketButton = new ButtonBuilder()
      .setCustomId(`ticket-${Date.now()}-${category?.id || 'null'}-${role?.id || 'null'}-${user?.id || 'null'}-${adminRole?.id || 'null'}`)
      .setLabel(buttonLabel)
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(ticketButton);

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};
