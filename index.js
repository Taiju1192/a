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

// Discordクライアント初期化
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

// ✅ activePlayers 読み込み or 初期化
try {
  client.activePlayers = require("./activePlayers");
  console.log("🎵 activePlayers を読み込みました");
} catch (e) {
  console.warn("⚠️ activePlayers.js が見つかりません。空のオブジェクトを初期化します");
  client.activePlayers = {};
}

// ✅ コマンド読み込み
client.commands = new Collection();
const commands = [];
const commandsDir = path.join(__dirname, "commands");
const commandFiles = fs.existsSync(commandsDir)
  ? fs.readdirSync(commandsDir).filter(f => f.endsWith(".js"))
  : [];

for (const file of commandFiles) {
  const command = require(path.join(commandsDir, file));
  if (command.data && command.data.name) {
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  } else if (command.name) {
    client.commands.set(command.name, command);
  } else {
    console.warn(`[WARN] コマンドファイル ${file} は無効な形式です`);
  }
}

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

// ✅ スラッシュコマンド登録（再登録対応）
client.once("ready", async () => {
  console.log(`✅ Botログイン成功: ${client.user.tag}`);
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  try {
    const existing = await rest.get(Routes.applicationCommands(process.env.CLIENT_ID));
    for (const cmd of existing) {
      await rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, cmd.id));
      console.log(`🗑️ コマンド削除: /${cmd.name}`);
    }

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("🌍 グローバルスラッシュコマンドを再登録完了");
  } catch (error) {
    console.error("❌ スラッシュコマンド登録エラー:", error);
  }

  // ✅ アクティビティ設定（任意ファイル）
  try {
    require("./activity")(client);
  } catch (e) {
    console.warn("ℹ️ activity.js が見つかりません（省略可能）");
  }
});

// ✅ Discordログイン
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

// ✅ Web サーバー（静的ファイル + サイト表示）
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
