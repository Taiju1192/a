const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('認証パネルを送信します')
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('付与するロール')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('title')
        .setDescription('タイトル')
    )
    .addStringOption(option =>
      option
        .setName('description')
        .setDescription('説明文')
    )
    .addStringOption(option =>
      option
        .setName('button')
        .setDescription('ボタンのラベル')
    )
    .addAttachmentOption(option =>
      option
        .setName('image')
        .setDescription('埋め込み画像')
    ),

  async execute(interaction) {
    // 管理者チェック
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({
        content: '❌ このコマンドは管理者のみ使用できます。',
        ephemeral: true
      });
    }

    const role = interaction.options.getRole('role');
    const title = interaction.options.getString('title') || '✅ 認証パネル';
    const description = interaction.options.getString('description') || `以下のボタンを押すことで ${role} が付与されます。`;
    const buttonLabel = interaction.options.getString('button') || '認証';
    const image = interaction.options.getAttachment('image');

    const colors = [0xff5733, 0x33ff57, 0x3357ff, 0xff33a6, 0x33fff3, 0xffa833, 0xa833ff];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color)
      .setTimestamp();

    if (image && image.contentType?.startsWith('image')) {
      embed.setImage(image.url);
    }

    const button = new ButtonBuilder()
      .setCustomId(`verify-${role.id}`)
      .setLabel(buttonLabel)
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};
