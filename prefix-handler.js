module.exports = async (message, client) => {
  if (!message.content.startsWith("m!")) return;
  const args = message.content.slice(2).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const interactionMock = {
    guild: message.guild,
    member: message.member,
    user: message.author,
    reply: (msg) => message.channel.send(msg),
    deferReply: async () => {},
    followUp: async (msg) => message.channel.send(msg),
    options: {
      getString: () => args.join(" ")
    },
    channel: message.channel
  };

  try {
    if (command === "start") require("./commands/start").execute(interactionMock);
    if (command === "stop") require("./commands/stop").execute(interactionMock);
    if (command === "skip") require("./commands/skip").execute(interactionMock);
    if (command === "help") require("./commands/help").execute(interactionMock);
  } catch (err) {
    console.error("Prefix command error:", err);
  }
};
