const express = require("express");
const fs = require("fs");
const path = require("path");
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
  Routes
} = require("discord.js");
require("dotenv").config();

console.log("🚀 起動開始");
console.log("DISCORD_TOKEN:", !!process.env.DISCORD_TOKEN);
console.log("CLIENT_ID:", process.env.CLIENT_ID || "❌ 未設定");
console.log("GUILD_ID:", process.env.GUILD_ID || "❌ 未設定");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
    Partials.User
  ]
});

// ✅ activePlayers 読み込み（存在しない場合はスキップ）
try {
  client.activePlayers = require("./activePlayers");
} catch (e) {
  console.warn("⚠️ activePlayers.js が見つかりません（省略可能）");
}

// ✅ コマンド読み込み
client.commands = new Collection();
const commands = [];
const commandFiles = fs.existsSync("./commands") ? fs.readdirSync("./commands").filter(f => f.endsWith(".js")) : [];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.data && command.data.name) {
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  } else if (command.name) {
    client.commands.set(command.name, command);
  } else {
    console.warn(`[WARN] コマンドファイル ${file} は無効な形式です`);
  }
}

// ✅ メッセージイベント（例：google-reaction）
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const googleCommand = client.commands.get("google-reaction");
  if (googleCommand?.handle) await googleCommand.handle(message, client);
});

// ✅ イベント読み込み
const eventsPath = path.join(__dirname, "events");
if (fs.existsSync(eventsPath)) {
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));
  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

// ✅ Discord ログイン
if (!process.env.DISCORD_TOKEN) {
  console.error("❌ DISCORD_TOKEN が設定されていません。");
} else {
  client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log("🔐 Discord login success!"))
    .catch(err => {
      console.error("❌ Discord login failed:", err);
      process.exit(1);
    });
}

// ✅ スラッシュコマンド登録
client.once("ready", async () => {
  console.log(`✅ Botログイン成功: ${client.user.tag}`);
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
  try {
    if (process.env.GUILD_ID) {
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      console.log("✅ GUILD_ID に登録完了");
    }
    if (process.env.GUILD_ID2) {
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID2),
        { body: commands }
      );
      console.log("✅ GUILD_ID2 に登録完了");
    }
  } catch (error) {
    console.error("❌ スラッシュコマンド登録エラー:", error);
  }
// ✅ アクティビティ設定
require("./activity")(client);
});

// ✅ Web サーバー（サイト表示）
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Webサーバー起動中: http://localhost:${PORT}`);
});
