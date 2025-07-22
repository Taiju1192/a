require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");

const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("🔄 スラッシュコマンドを登録しています...");

    // 1つ目のギルドに登録
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log(`✅ ギルド ${process.env.GUILD_ID} に登録完了！`);

    // 2つ目のギルドに登録
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID2),
      { body: commands }
    );
    console.log(`✅ ギルド ${process.env.GUILD_ID2} に登録完了！`);

    console.log("✅ スラッシュコマンド登録完了！");
  } catch (error) {
    console.error(error);
  }
})();
