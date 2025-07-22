// activity.js - Botのアクティビティ設定

module.exports = (client) => {
  client.user.setPresence({
    activities: [
      {
        name: "サーバーを監視中",
        type: 3 // Watching
      }
    ],
    status: "online"
  });

  console.log("✅ アクティビティ設定完了: サイト監視中");
};
