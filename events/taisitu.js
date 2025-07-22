const { Events, EmbedBuilder } = require("discord.js");

let lastLeaveId = null;

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member, client) {
    console.log("[DEBUG] イベント発火: guildMemberRemove from taisitu.js");

    // 同じユーザーの重複イベント防止
    if (member.id === lastLeaveId) return;
    lastLeaveId = member.id;

    const logChannelId = "1396402907053817866";
    const logChannel = member.guild.channels.cache.get(logChannelId);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setColor(0xed4245) // 赤
      .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
      .setDescription(`<@${member.id}> が退出しました。`)
      .setTimestamp();

    await logChannel.send({ embeds: [embed] });
    console.log("[LEAVE]", member.user.username);
  }
};
