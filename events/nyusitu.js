const { Events, EmbedBuilder } = require("discord.js");

let lastJoinId = null;

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member, client) {
    console.log("[DEBUG] イベント発火: guildMemberAdd from nyusitu.js");

    // 同じユーザーの重複イベント防止
    if (member.id === lastJoinId) return;
    lastJoinId = member.id;

    const logChannelId = "1396402907053817866";
    const logChannel = member.guild.channels.cache.get(logChannelId);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setColor(0x57f287) // 緑
      .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
      .setDescription(`<@${member.id}> が入室しました。`)
      .setTimestamp();

    await logChannel.send({ embeds: [embed] });
    console.log("[JOIN]", member.user.username);
  }
};
