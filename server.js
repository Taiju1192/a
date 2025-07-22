const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.static("public"));
app.use(express.json());

const tracks = require("./public/tracks.js");

// ✅ 全曲リストを取得するAPI
app.get("/api/tracks", (req, res) => {
  res.json({
    success: true,
    count: tracks.length,
    tracks: tracks,
  });
});

// ✅ 特定IDの曲を取得
app.get("/api/tracks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id < 0 || id >= tracks.length) {
    return res.status(404).json({
      success: false,
      message: "曲が見つかりません",
    });
  }

  res.json({
    success: true,
    track: {
      id: id,
      title: tracks[id].title,
      src: tracks[id].src,
    },
  });
});

// ✅ ランダムな曲を取得
app.get("/api/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * tracks.length);
  res.json({
    success: true,
    track: {
      id: randomIndex,
      title: tracks[randomIndex].title,
      src: tracks[randomIndex].src,
    },
  });
});

// ✅ 曲名検索API
app.get("/api/search", (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({
      success: false,
      message: "検索クエリが必要です",
    });
  }

  const results = tracks
    .map((track, index) => ({ ...track, id: index }))
    .filter((track) => track.title.toLowerCase().includes(query.toLowerCase()));

  res.json({
    success: true,
    count: results.length,
    query: query,
    tracks: results,
  });
});

// ✅ アーティスト検索（タイトルにアーティスト名が含まれる前提）
app.get("/api/artist/:artist", (req, res) => {
  const artist = req.params.artist;
  const results = tracks
    .map((track, index) => ({ ...track, id: index }))
    .filter((track) => track.title.toLowerCase().includes(artist.toLowerCase()));

  res.json({
    success: true,
    count: results.length,
    artist: artist,
    tracks: results,
  });
});

// ✅ リクエスト保存API
const requestFile = path.join(__dirname, "requests.json");
if (!fs.existsSync(requestFile)) {
  fs.writeFileSync(requestFile, JSON.stringify([]));
}

app.get("/api/requests", (req, res) => {
  const data = fs.readFileSync(requestFile, "utf-8");
  res.json(JSON.parse(data));
});

app.post("/api/request", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).send("曲名は必須です");

  const data = JSON.parse(fs.readFileSync(requestFile));
  data.push({ title });
  fs.writeFileSync(requestFile, JSON.stringify(data, null, 2));
  res.json({ status: "OK" });
});

app.post("/api/delete", (req, res) => {
  const { title, key } = req.body;
  if (key !== process.env.DELETE_KEY)
    return res.status(403).send("無効なキー");

  let data = JSON.parse(fs.readFileSync(requestFile));
  data = data.filter((item) => item.title !== title);
  fs.writeFileSync(requestFile, JSON.stringify(data, null, 2));
  res.json({ status: "削除しました" });
});

// ✅ サイト本体
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🎵 サーバー起動 http://localhost:${port}`);
});
