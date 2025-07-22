// activity.js - Botのアクティビティ設定

module.exports = (client) => {
  client.user.setPresence({
    activities: [
      {
        name: "https://discord-bot-9242.onrender.com/ を監視中",
        type: 3 // Watching
      }
    ],
    status: "online"
  });

  console.log("✅ アクティビティ設定完了: サイト監視中");
};
