// 🎵 music player script.js - 完全版 with LocalStorage + Favorite-only Mode support

const player = document.getElementById("player");
const skipBtn = document.getElementById("skip");
const shuffleBtn = document.getElementById("shuffle");
const playModeBtn = document.getElementById("playMode");
const repeatOneBtn = document.getElementById("repeatOneBtn");
const seek = document.getElementById("seek");
const tracklist = document.getElementById("tracklist");
const search = document.getElementById("search");

const nowPlayingEl = document.getElementById("nowPlaying");
const nextTrackEl = document.getElementById("nextTrack");

const volumeSlider = document.getElementById("volumeSlider");
const speedSlider = document.getElementById("speedSlider");
const muteBtn = document.getElementById("muteBtn");
const speedLabel = document.getElementById("speedLabel");

const requestButton = document.getElementById("requestButton");
const floatingRequest = document.getElementById("floatingRequest");
const requestForm = document.getElementById("requestForm");
const requestTitle = document.getElementById("requestTitle");
const requestList = document.getElementById("requestList");

let currentTrack = 0;
let nextTrack = 1;
let playMode = "sequential";
let repeatOne = false;
let shuffledPlaylist = [];
let recentlyPlayed = [];
let favoriteOnlyMode = false;

const RECENT_HISTORY_SIZE = 10;

function saveCurrentTrack() {
  localStorage.setItem("currentTrackIndex", currentTrack);
}

function restoreLastTrack() {
  const savedIndex = parseInt(localStorage.getItem("currentTrackIndex"));
  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < tracks.length) {
    loadTrack(savedIndex);
  } else {
    playRandomTrack();
  }
}

function getAvailableTracks() {
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (favoriteOnlyMode) {
    return tracks.map((t, i) => favs.includes(t.title) ? i : -1).filter(i => i !== -1);
  } else {
    return tracks.map((_, i) => i);
  }
}

function getRandomTrackWithHistory() {
  const candidates = getAvailableTracks();
  if (candidates.length === 0) return 0;
  if (recentlyPlayed.length >= candidates.length) recentlyPlayed = [];
  const available = candidates.filter(i => !recentlyPlayed.includes(i));
  if (available.length === 0) {
    recentlyPlayed.shift();
    return getRandomTrackWithHistory();
  }
  return available[Math.floor(Math.random() * available.length)];
}

function addToRecentlyPlayed(index) {
  const existingIndex = recentlyPlayed.indexOf(index);
  if (existingIndex > -1) recentlyPlayed.splice(existingIndex, 1);
  recentlyPlayed.unshift(index);
  if (recentlyPlayed.length > RECENT_HISTORY_SIZE) {
    recentlyPlayed = recentlyPlayed.slice(0, RECENT_HISTORY_SIZE);
  }
}

function determineNextTrack() {
  const available = getAvailableTracks();
  const currentIndexInAvailable = available.indexOf(currentTrack);
  nextTrack = repeatOne
    ? currentTrack
    : playMode === "random"
    ? getRandomTrackWithHistory()
    : available[(currentIndexInAvailable + 1) % available.length];
}

function updateNowNextDisplay() {
  nowPlayingEl.textContent = tracks[currentTrack]?.title || "---";
  nextTrackEl.textContent = tracks[nextTrack]?.title || "---";
}

function loadTrack(index) {
  currentTrack = index;
  player.src = tracks[index].src;
  player.play();
  highlightCurrentTrack();
  addToRecentlyPlayed(index);
  determineNextTrack();
  updateNowNextDisplay();
  updateScrollingTitle(tracks[index].title);
  startTitleScroll(tracks[index].title);
  saveCurrentTrack();

  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: tracks[index].title,
      artist: "曲追加リクエストはこちらへ DISCORD_ID：taiju_5662",
      album: "プレイリスト",
      artwork: [
        {
          src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/disc_music_15034-300x300.png?v=1750483913156",
          sizes: "300x300",
          type: "image/png"
        }
      ]
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      loadTrack(nextTrack);
    });
  }
}

function highlightCurrentTrack() {
  const lis = tracklist.querySelectorAll("li");
  lis.forEach((li, i) => {
    li.style.fontWeight = i === currentTrack ? "bold" : "normal";
  });
}

function toggleFavorite(title) {
  let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (favs.includes(title)) {
    favs = favs.filter(t => t !== title);
  } else {
    favs.push(title);
  }
  localStorage.setItem("favorites", JSON.stringify(favs));
  createTrackList();
  renderFavorites();
}

function createTrackList() {
  tracklist.innerHTML = "";
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  tracks.forEach((track, i) => {
    const li = document.createElement("li");
    const titleSpan = document.createElement("span");
    titleSpan.textContent = track.title;
    titleSpan.style.cursor = "pointer";
    titleSpan.onclick = () => loadTrack(i);

    const downloadLink = document.createElement("a");
    downloadLink.href = track.src;
    downloadLink.textContent = "⬇️";
    downloadLink.setAttribute("download", "");
    downloadLink.style.marginLeft = "10px";
    downloadLink.title = "ダウンロード";

    const favoriteSpan = document.createElement("span");
    const isFav = favs.includes(track.title);
    favoriteSpan.textContent = isFav ? "⭐" : "☆";
    favoriteSpan.className = "favorite-icon";
    favoriteSpan.title = isFav ? "お気に入り済み" : "お気に入りに追加";
    favoriteSpan.onclick = () => toggleFavorite(track.title);

    li.appendChild(titleSpan);
    li.appendChild(downloadLink);
    li.appendChild(favoriteSpan);
    tracklist.appendChild(li);
  });
}

function renderFavorites() {
  const favEl = document.getElementById("favorites");
  if (!favEl) return;
  favEl.innerHTML = "";
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  tracks.forEach((track, i) => {
    if (favs.includes(track.title)) {
      const li = document.createElement("li");
      li.textContent = track.title;
      li.style.cursor = "pointer";
      li.onclick = () => loadTrack(i);
      favEl.appendChild(li);
    }
  });
}

function updatePlayModeButton() {
  playModeBtn.textContent = playMode === "sequential" ? "🔁 順番再生" : "🔀 ランダム再生";
  playModeBtn.classList.toggle("random-mode", playMode === "random");
}

function playRandomTrack() {
  const index = getRandomTrackWithHistory();
  loadTrack(index);
}

repeatOneBtn.addEventListener("click", () => {
  repeatOne = !repeatOne;
  repeatOneBtn.textContent = repeatOne ? "🔂 リピート中" : "🔂 リピート1曲";
  determineNextTrack();
  updateNowNextDisplay();
  alert(repeatOne ? "リピートモードON" : "リピートモードOFF");
});

player.addEventListener("ended", () => {
  if (repeatOne) {
    player.currentTime = 0;
    player.play();
  } else {
    loadTrack(nextTrack);
  }
});

seek.addEventListener("input", () => {
  if (player.duration) {
    player.currentTime = (seek.value / 100) * player.duration;
  }
});

player.addEventListener("timeupdate", () => {
  if (player.duration) {
    seek.value = (player.currentTime / player.duration) * 100;
  }
});

skipBtn.addEventListener("click", () => {
  loadTrack(nextTrack);
});

shuffleBtn.addEventListener("click", () => {
  playMode = "random";
  recentlyPlayed = [];
  updatePlayModeButton();
  playRandomTrack();
  alert("シャッフル再生を開始しました！");
});

playModeBtn.addEventListener("click", () => {
  playMode = playMode === "sequential" ? "random" : "sequential";
  recentlyPlayed = [];
  determineNextTrack();
  updateNowNextDisplay();
  updatePlayModeButton();
  alert(playMode === "random" ? "ランダム再生モードに切り替えました！" : "順番再生モードに切り替えました！");
});

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const filtered = tracks.filter(t => t.title.toLowerCase().includes(value));
  tracklist.innerHTML = "";
  filtered.forEach((track) => {
    const li = document.createElement("li");
    const titleSpan = document.createElement("span");
    titleSpan.textContent = track.title;
    titleSpan.style.cursor = "pointer";
    titleSpan.onclick = () => loadTrack(tracks.indexOf(track));

    const downloadLink = document.createElement("a");
    downloadLink.href = track.src;
    downloadLink.textContent = "⬇️";
    downloadLink.setAttribute("download", "");
    downloadLink.style.marginLeft = "10px";
    downloadLink.title = "ダウンロード";

    const favoriteSpan = document.createElement("span");
    favoriteSpan.textContent = "☆";
    favoriteSpan.className = "favorite-icon";
    favoriteSpan.title = "お気に入りに追加";
    favoriteSpan.onclick = () => toggleFavorite(track.title);

    li.appendChild(titleSpan);
    li.appendChild(downloadLink);
    li.appendChild(favoriteSpan);
    tracklist.appendChild(li);
  });
});

const settingsButton = document.getElementById("settingsButton");
const floatingSettings = document.getElementById("floatingSettings");
settingsButton.addEventListener("click", (e) => {
  e.preventDefault();
  floatingSettings.classList.remove("hidden");
  setTimeout(() => floatingSettings.classList.add("show"), 10);
});

document.addEventListener("click", (e) => {
  if (floatingSettings.classList.contains("show") && !floatingSettings.contains(e.target) && e.target !== settingsButton) {
    floatingSettings.classList.remove("show");
    setTimeout(() => floatingSettings.classList.add("hidden"), 500);
  }
});

requestButton.addEventListener("click", (e) => {
  e.preventDefault();
  floatingRequest.classList.remove("hidden");
  setTimeout(() => floatingRequest.classList.add("show"), 10);
});

document.addEventListener("click", (e) => {
  if (floatingRequest.classList.contains("show") && !floatingRequest.contains(e.target) && e.target !== requestButton) {
    floatingRequest.classList.remove("show");
    setTimeout(() => floatingRequest.classList.add("hidden"), 500);
  }
});

requestForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = requestTitle.value.trim();
  if (!title) return;
  await fetch("/api/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  requestTitle.value = "";
  loadRequests();
});

async function loadRequests() {
  const res = await fetch("/api/requests");
  const data = await res.json();
  requestList.innerHTML = "";
  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.title;
    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";
    delBtn.onclick = async () => {
      const key = prompt("削除キーを入力してください（管理者専用）:");
      if (!key) return;
      await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: item.title, key })
      });
      loadRequests();
    };
    li.appendChild(delBtn);
    requestList.appendChild(li);
  });
}

volumeSlider.addEventListener("input", () => {
  player.volume = parseFloat(volumeSlider.value);
});

speedSlider.addEventListener("input", () => {
  const speed = parseFloat(speedSlider.value);
  player.playbackRate = speed;
  speedLabel.textContent = `速度: ${speed.toFixed(1)}x`;
});

muteBtn.addEventListener("click", () => {
  player.muted = !player.muted;
  muteBtn.textContent = player.muted ? "🔇 ミュート解除" : "🔈 ミュート";
});

const favToggleBtn = document.createElement("button");
favToggleBtn.textContent = "⭐ お気に入り再生: OFF";
favToggleBtn.onclick = () => {
  favoriteOnlyMode = !favoriteOnlyMode;
  favToggleBtn.textContent = favoriteOnlyMode ? "⭐ お気に入り再生: ON" : "⭐ お気に入り再生: OFF";
  recentlyPlayed = [];
  determineNextTrack();
  updateNowNextDisplay();
  alert(favoriteOnlyMode ? "お気に入りのみ再生モード ON" : "お気に入りのみ再生モード OFF");
};
document.querySelector(".controls")?.appendChild(favToggleBtn);

let scrollTitleInterval;
let titleBase = "🎵 Now Playing: ";
let currentTitleScroll = "";
let scrollIndex = 0;

function startTitleScroll(trackTitle) {
  titleBase = `🎵 Now Playing: ${trackTitle} — `;
  currentTitleScroll = titleBase + " ";
  scrollIndex = 0;
  if (scrollTitleInterval) clearInterval(scrollTitleInterval);
  scrollTitleInterval = setInterval(() => {
    document.title = currentTitleScroll.substring(scrollIndex) + currentTitleScroll.substring(0, scrollIndex);
    scrollIndex = (scrollIndex + 1) % currentTitleScroll.length;
  }, 100);
}

function updateScrollingTitle(trackTitle) {
  const el = document.getElementById("scrollingTitle");
  if (el) el.textContent = `🎵 Now Playing: ${trackTitle} — `.repeat(3);
}

createTrackList();
renderFavorites();
playMode = "random";
updatePlayModeButton();
restoreLastTrack();
determineNextTrack();
updateNowNextDisplay();
loadRequests();
