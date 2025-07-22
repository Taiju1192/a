const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require("discord.js");

const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  entersState,
  VoiceConnectionStatus,
  StreamType
} = require("@discordjs/voice");

const { spawn } = require("child_process");
const ffmpegPath = require("ffmpeg-static");
const fs = require("fs");
const path = require("path");
const os = require("os");
const https = require("https");
const tracks = require("../data/tracks");
const activePlayers = require("../activePlayers");

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const extension = path.extname(new URL(url).pathname) || ".mp3";
    const tempPath = path.join(os.tmpdir(), `audio_${Date.now()}${extension}`);
    const file = fs.createWriteStream(tempPath);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download file: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(tempPath)));
    }).on("error", (err) => {
      fs.unlink(tempPath, () => {});
      reject(err);
    });
  });
}

function findTracksByKeyword(keyword) {
  keyword = keyword.toLowerCase();
  return tracks.filter(track => track.title.toLowerCase().includes(keyword));
}

async function createAudioResourceFromSrc(src) {
  let audioPath = src;
  if (audioPath.startsWith("http")) {
    audioPath = await downloadFile(audioPath);
  }

  const ffmpeg = spawn(ffmpegPath, [
    "-i", audioPath,
    "-vn",
    "-f", "s16le",
    "-ar", "48000",
    "-ac", "2",
    "pipe:1"
  ], { stdio: ["pipe", "pipe", "pipe"] });

  await new Promise((resolve, reject) => {
    ffmpeg.stdout.once("readable", resolve);
    ffmpeg.once("error", reject);
  });

  const resource = createAudioResource(ffmpeg.stdout, {
    inputType: StreamType.Raw,
    inlineVolume: true
  });

  return { resource, audioPath };
}

async function playNext(guildId, firstTrack = null) {
  const playerData = activePlayers.get(guildId);
  if (!playerData) return;

  if (firstTrack) {
    playerData.queue.unshift(firstTrack);
  }

  if (playerData.queue.length === 0) {
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    playerData.queue.push(randomTrack);
  }

  const nextTrack = playerData.queue.shift();
  playerData.currentTrack = nextTrack;

  try {
    const { resource, audioPath } = await createAudioResourceFromSrc(nextTrack.src);

    // ✅ 音量設定を反映
    if (playerData.volume && resource.volume) {
      resource.volume.setVolume(playerData.volume);
    }

    playerData.player.play(resource);
    playerData.currentAudioPath = audioPath;

    // ✅ リピート処理（再度末尾に追加）
    if (playerData.repeat) {
      playerData.queue.push(nextTrack);
    }

    await playerData.textChannel.send(`🎶 再生中: **${nextTrack.title}**`);
  } catch (err) {
    console.error("❌ 曲の再生中にエラー:", err);
    try {
      await playerData.textChannel.send("⚠️ 曲の再生中にエラーが発生しました。");
    } catch {}
    playerData.connection.destroy();
    activePlayers.delete(guildId);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("音楽再生を開始します")
    .addStringOption(option =>
      option.setName("query").setDescription("曲のURLまたはキーワード").setRequired(false)
    ),

  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({
        content: "🔊 まずボイスチャンネルに参加してください！",
        ephemeral: true
      });
    }

    const guildId = interaction.guild.id;

    if (activePlayers.has(guildId)) {
      return interaction.reply({
        content: "❗ 既に再生中です。止めるには /stop を使ってください。",
        ephemeral: true
      });
    }

    try {
      await interaction.deferReply();

      const query = interaction.options.getString("query");
      let selectedTrack = null;

      if (query) {
        if (query.startsWith("http")) {
          selectedTrack = {
            title: decodeURIComponent(query.split("/").pop()),
            src: query
          };
        } else {
          const matchedTracks = findTracksByKeyword(query);
          if (matchedTracks.length === 0) {
            return interaction.editReply(`⚠️ キーワード「${query}」に一致する曲は見つかりませんでした。`);
          } else if (matchedTracks.length === 1) {
            selectedTrack = matchedTracks[0];
          } else {
            const options = matchedTracks.slice(0, 25).map((track, i) => ({
              label: track.title.length > 100 ? track.title.slice(0, 97) + "..." : track.title,
              value: String(i),
            }));

            const embed = new EmbedBuilder()
              .setTitle("曲の候補が複数見つかりました")
              .setDescription("下のメニューから再生したい曲を選んでください");

            const row = new ActionRowBuilder().addComponents(
              new StringSelectMenuBuilder()
                .setCustomId("selectTrack")
                .setPlaceholder("曲を選択してください")
                .addOptions(options)
            );

            await interaction.editReply({ embeds: [embed], components: [row] });

            const filter = i => i.customId === "selectTrack" && i.user.id === interaction.user.id;
            try {
              const selectInteraction = await interaction.channel.awaitMessageComponent({ filter, time: 60000 });
              const index = parseInt(selectInteraction.values[0], 10);
              selectedTrack = matchedTracks[index];
              await selectInteraction.update({
                content: `✅ 「${selectedTrack.title}」を再生します。`,
                components: [],
                embeds: []
              });
            } catch {
              return interaction.editReply({
                content: "⏰ 選択がタイムアウトしました。コマンドをやり直してください。",
                components: [],
                embeds: []
              });
            }
          }
        }
      }

      if (!selectedTrack) {
        selectedTrack = tracks[Math.floor(Math.random() * tracks.length)];
      }

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
      const player = createAudioPlayer();

      player.on(AudioPlayerStatus.Idle, async () => {
        const playerData = activePlayers.get(guildId);
        if (!playerData) return;

        const currentPath = playerData.currentAudioPath;
        if (currentPath?.startsWith(os.tmpdir())) {
          fs.unlink(currentPath, e => { if (e) console.error(e); });
        }

        playNext(guildId);
      });

      player.on("error", error => {
        console.error("❌ 再生エラー:", error);
        try {
          interaction.channel.send("⚠️ 再生中にエラーが発生しました。");
        } catch {}
        connection.destroy();
        activePlayers.delete(guildId);
      });

      connection.subscribe(player);

      // ✅ 初期設定に volume と repeat を追加（重要！）
      activePlayers.set(guildId, {
        connection,
        player,
        queue: [],
        currentTrack: null,
        currentAudioPath: null,
        interaction,
        textChannel: interaction.channel,
        volume: 1.0,       // ✅ 初期音量
        repeat: false      // ✅ 初期リピート設定
      });

      await playNext(guildId, selectedTrack);
      await interaction.editReply("▶️ 再生を開始しました。");

    } catch (error) {
      console.error("❌ /start コマンド実行中のエラー:", error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "⚠️ エラーが発生しました。再生できませんでした。",
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: "⚠️ エラーが発生しました。再生できませんでした。",
          ephemeral: true
        });
      }
    }
  }
};
