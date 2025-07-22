const tracks = [
  {
    title: "カーテンコール / 優里",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%80%8C%E3%82%AB%E3%83%BC%E3%83%86%E3%83%B3%E3%82%B3%E3%83%BC%E3%83%AB%E3%80%8D%E5%84%AA%E9%87%8C%20%E2%80%9D%E3%83%92%E3%83%AD%E3%82%A2%E3%82%AB%E2%80%9D%20%E3%82%B9%E3%83%98%E3%82%9A%E3%82%B7%E3%83%A3%E3%83%AB%E3%83%9F%E3%83%A5%E3%83%BC%E3%82%B7%E3%82%99%E3%83%83%E3%82%AF%E3%83%92%E3%82%99%E3%83%86%E3%82%99%E3%82%AA%EF%BC%8F%E3%80%8E%E5%83%95%E3%81%AE%E3%83%92%E3%83%BC%E3%83%AD%E3%83%BC%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8F7%E6%9C%9F%E7%AC%AC2%E3%82%AF%E3%83%BC%E3%83%ABOP%E3%83%86%E3%83%BC%E3%83%9E%20%E3%82%A2%E3%83%8B%E3%83%A1MV.mp4?v=1750427298086"
  },
  {
    title: "Habit / SEKAI NO OWARI",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/SEKAI%20NO%20OWARI%E3%80%8CHabit%E3%80%8D.mp4?v=1750427339289"
  }, 
  {
    title: "SPARKLE-RADWINPS",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/SPARKLE-RADWINPS%E3%80%8C%E6%AD%8C%E8%A9%9E%E4%BB%98%E3%81%8D%E3%80%8D.mp4?v=1750427312557"
  }, 
  {
    title: "Uru 『それを愛と呼ぶなら』",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%80%90Official%E3%80%91Uru%20%E3%80%8E%E3%81%9D%E3%82%8C%E3%82%92%E6%84%9B%E3%81%A8%E5%91%BC%E3%81%B5%E3%82%99%E3%81%AA%E3%82%89%E3%80%8F%20LIVE%20%E2%80%9CUru%20Tour%202023%E3%80%8Ccontrast%E3%80%8D%E2%80%9D%20on%20WOWOW%E3%83%95%E3%82%9A%E3%83%A9%E3%82%B9.mp4?v=1750427315980"
  }, 
  {
    title: " 小さな恋のうた ／ MONGOL800(cover) by天月",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%80%90%E3%82%AA%E3%83%AA%E3%82%B7%E3%82%99%E3%83%8A%E3%83%ABPV%E3%80%91%20%E5%B0%8F%E3%81%95%E3%81%AA%E6%81%8B%E3%81%AE%E3%81%86%E3%81%9F%20%EF%BC%8F%20MONGOL800(cover)%20by%E5%A4%A9%E6%9C%88.mp4?v=1750427316146"
  }, 
  {
    title: "SEKAI NO OWARI「最高到達点」",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/SEKAI%20NO%20OWARI%E3%80%8C%E6%9C%80%E9%AB%98%E5%88%B0%E9%81%94%E7%82%B9%E3%80%8D.mp4?v=1750427346982"
  }, 
  {
    title: "WANIMA「シグナル」",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/WANIMA%E3%80%8C%E3%82%B7%E3%82%AF%E3%82%99%E3%83%8A%E3%83%AB%E3%80%8DOFFICIAL%20MUSIC%20VIDEO.mp4?v=1750427349757"
  }, 
  {
    title: "レミオロメン - 粉雪",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%83%AC%E3%83%9F%E3%82%AA%E3%83%AD%E3%83%A1%E3%83%B3%20-%20%E7%B2%89%E9%9B%AA.mp4?v=1750427352058"
  }, 
  {
    title: "WANIMA - ともに",
    src: "https://cdn.glitch.me/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/WANIMA%20-%20%E3%81%A8%E3%82%82%E3%81%AB%20(OFFICIAL%20VIDEO).mp4?v=1750427361461"
  }, 
  {
    title: "僕らまた (Us, again) - SG",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E5%83%95%E3%82%89%E3%81%BE%E3%81%9F%20(Us%2C%20again)%20-%20SG%20(Official%20Lyric%20Video).mp4?v=1750427363900"
  }, 
  {
    title: "優里『ベテルギウス』",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E5%84%AA%E9%87%8C%E3%80%8E%E3%83%98%E3%82%99%E3%83%86%E3%83%AB%E3%82%AD%E3%82%99%E3%82%A6%E3%82%B9%E3%80%8FOfficial%20Music%20Vide.mp4?v=1750427392150"
  }, 
  {
    title: "優里『レオ』",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E5%84%AA%E9%87%8C%E3%80%8E%E3%83%AC%E3%82%AA%E3%80%8FOfficial%20Music%20Video.mp4?v=1750427403287"
  }, 
  {
    title: "優里『ドライフラワー』",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E5%84%AA%E9%87%8C%E3%80%8E%E3%83%88%E3%82%99%E3%83%A9%E3%82%A4%E3%83%95%E3%83%A9%E3%83%AF%E3%83%BC%E3%80%8FOfficial%20Music%20Video%20-%E3%83%86%E3%82%99%E3%82%A3%E3%83%AC%E3%82%AF%E3%82%BF%E3%83%BC%E3%82%B9%E3%82%99%E3%82%AB%E3%83%83%E3%83%88ver.-.mp4?v=1750427405165"
  }, 
  {
    title: "友成空(TOMONARI SORA) - ”鬼の宴",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E5%8F%8B%E6%88%90%E7%A9%BA(TOMONARI%20SORA)%20-%20%E2%80%9DDemons%20Banquet%E2%80%9D%20%EF%BC%BBLyric%20Video%EF%BC%BD.mp4?v=1750427412328"
  }, 
  {
    title: "友成空(TOMONARI SORA) - ”睨めっ娘”",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E5%8F%8B%E6%88%90%E7%A9%BA(TOMONARI%20SORA)%20-%20%E2%80%9DNiramekko%E2%80%9D%20%EF%BC%BBLyric%20Video%EF%BC%BD.mp4?v=1750427422402"
  }, 
  {
    title: "米津玄師 - 感電",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%AB%20-%20%E6%84%9F%E9%9B%BB%20%20%20Kenshi%20Yonezu%20-%20KANDEN.mp4?v=1750427422402"
  }, 
  {
    title: "米津玄師 - KICKBACK",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%AB%20Kenshi%20Yonezu%20-%20KICKBACK.mp4?v=1750427426374"
  }, 
  {
    title: "米津玄師 - 馬と鹿",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%AB%20%20-%20%E9%A6%AC%E3%81%A8%E9%B9%BF%20%20%20Kenshi%20Yonezu%20-%20Uma%20to%20Shika.mp4?v=1750427429144"
  }, 
  {
    title: "米津玄師 - Flamingo",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%AB%20%20-%20Flamingo%20%EF%BC%8F%20Kenshi%20Yonezu.mp4?v=1750427433590"
  }, 
  {
    title: "川崎鷹也-魔法の絨毯",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E5%B7%9D%E5%B4%8E%E9%B7%B9%E4%B9%9F-%E9%AD%94%E6%B3%95%E3%81%AE%E7%B5%A8%E6%AF%AF%E3%80%90OFFICIAL%20MUSIC%20VIDEO%E3%80%91.mp4?v=1750427440415"
  }, 
  {
    title: "米津玄師 - アイネクライネ",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%AB%20%20-%20%E3%82%A2%E3%82%A4%E3%83%8D%E3%82%AF%E3%83%A9%E3%82%A4%E3%83%8D%20%2C%20Kenshi%20Yonezu%20-%20Eine%20Kleine.mp4?v=1750427440457"
  }, 
  {
    title: "米津玄師 - ピースサイン",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%AB%20-%20%E3%83%92%E3%82%9A%E3%83%BC%E3%82%B9%E3%82%B5%E3%82%A4%E3%83%B3%20%2C%20Kenshi%20Yonezu%20-%20Peace%20Sign.mp4?v=1750427447825"
  }, 
  {
    title: "怪獣の花唄 ／ Vaundy",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E6%80%AA%E7%8D%A3%E3%81%AE%E8%8A%B1%E5%94%84%20%EF%BC%8F%20Vaundy%20%EF%BC%9A%20MUSIC%20VIDEO.mp4?v=1750427449224"
  }, 
  {
    title: "はいよろこんで ／ こっちのけんと",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%81%AF%E3%81%84%E3%82%88%E3%82%8D%E3%81%93%E3%82%93%E3%81%A6%E3%82%99%20%EF%BC%8F%20%E3%81%93%E3%81%A3%E3%81%A1%E3%81%AE%E3%81%91%E3%82%93%E3%81%A8%20MV.mp4?v=1750427465064"
  }, 
  {
    title: "菅田将暉 『まちがいさがし』",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E8%8F%85%E7%94%B0%E5%B0%86%E6%9A%89%20%E3%80%8E%E3%81%BE%E3%81%A1%E3%81%8B%E3%82%99%E3%81%84%E3%81%95%E3%81%8B%E3%82%99%E3%81%97%E3%80%8F.mp4?v=1750427468587"
  }, 
  {
    title: "マカロニえんぴつ「なんでもないよ、」",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%83%9E%E3%82%AB%E3%83%AD%E3%83%8B%E3%81%88%E3%82%93%E3%81%B2%E3%82%9A%E3%81%A4%E3%80%8C%E3%81%AA%E3%82%93%E3%81%A6%E3%82%99%E3%82%82%E3%81%AA%E3%81%84%E3%82%88%E3%80%81%E3%80%8DMV.mp4?v=1750427469638"
  }, 
  {
    title: "廻廻奇譚 - Eve",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E5%BB%BB%E5%BB%BB%E5%A5%87%E8%AD%9A%20-%20Eve%20MV.mp4?v=1750427489596"
  }, 
  {
    title: "タイムパラドックス -  Vaundy",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%8F%E3%82%9A%E3%83%A9%E3%83%88%E3%82%99%E3%83%83%E3%82%AF%E3%82%B9%20(%E3%80%8E%E6%98%A0%E7%94%BB%E3%83%88%E3%82%99%E3%83%A9%E3%81%88%E3%82%82%E3%82%93%20%E3%81%AE%E3%81%B2%E3%82%99%E5%A4%AA%E3%81%AE%E5%9C%B0%E7%90%83%E4%BA%A4%E9%9F%BF%E6%A5%BD%E3%80%8F%E4%B8%BB%E9%A1%8C%E6%AD%8C)%20%EF%BC%8F%20Vaundy%EF%BC%9AMUSIC%20VIDEO.mp4?v=1750427492023"
  }, 
  {
    title: "Official髭男dism - 宿命",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Official%E9%AB%AD%E7%94%B7dism%20-%20%E5%AE%BF%E5%91%BD%EF%BC%BBOfficial%20Video%EF%BC%BD.mp4?v=1750427493271"
  }, 
  {
    title: "SEKAI NO OWARI ドラゴンナイト",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/SEKAI%20NO%20OWARI%20%20%20%20%20%E3%83%88%E3%82%99%E3%83%A9%E3%82%B3%E3%82%99%E3%83%B3%E3%83%8A%E3%82%A4%E3%83%88%E3%80%80%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%80%80%E6%AD%8C%E8%A9%9E%E4%BB%98%E3%81%8D.mp4?v=1750427501811"
  }, 
  {
    title: "SEKAI NO OWARI「RPG」",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/SEKAI%20NO%20OWARI%E3%80%8CRPG%E3%80%8D.mp4?v=1750427528086"
  }, 
  {
    title: "Omoinotake ｜ 幾億光年",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Omoinotake%20%EF%BD%9C%20%E5%B9%BE%E5%84%84%E5%85%89%E5%B9%B4%20%E3%80%90Official%20Music%20Video%E3%80%91.mp4?v=1750427531951"
  }, 
  {
    title: "Official髭男dism - Mixed Nuts",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Official%E9%AB%AD%E7%94%B7dism%20-%20Mixed%20Nuts%20%EF%BC%BBOfficial%20Video%EF%BC%BD.mp4?v=1750427534137"
  }, 
  {
    title: "Official髭男dism - Pretender",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Official%E9%AB%AD%E7%94%B7dism%20-%20Pretender%EF%BC%BBOfficial%20Video%EF%BC%BD.mp4?v=1750427535936"
  }, 
  {
    title: "Official髭男dism - I LOVE...",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Official%E9%AB%AD%E7%94%B7dism%20-%20I%20LOVE...%EF%BC%BBOfficial%20Video%EF%BC%BD.mp4?v=1750427536520"
  },
  {
    title: "nobodyknows+「ココロオドル」",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/nobodyknows%2B%E3%80%8C%E3%82%B3%E3%82%B3%E3%83%AD%E3%82%AA%E3%83%88%E3%82%99%E3%83%AB%E3%80%8DOFFICIAL%20MUSIC%20VIDEO.mp4?v=1750427543924"
  },
  {
    title: "MY FIRST STORY - I'm a mess",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/MY%20FIRST%20STORY%20-%20I'm%20a%20mess%20(Audio).mp4?v=1750427547277"
  },
  {
    title: "Mrs. GREEN APPLE「天国」",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%E3%80%8C%E5%A4%A9%E5%9B%BD%E3%80%8DOfficial%20Music%20Video.mp4?v=1750427554170"
  },
  {
    title: "Official髭男dism - Subtitle",
    src: "https://cdn.glitch.me/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Official%E9%AB%AD%E7%94%B7dism%20-%20Subtitle%20%5BOfficial%20Video%5D.mp4?v=1750427556862"
  },
  {
    title: "Mrs. GREEN APPLE「ダンスホール」",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%E3%80%8C%E3%82%BF%E3%82%99%E3%83%B3%E3%82%B9%E3%83%9B%E3%83%BC%E3%83%AB%E3%80%8DOfficial%20Music%20Video.mp4?v=1750427557547"
  },
  {
    title: "Mrs. GREEN APPLE「ケセラセラ」",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%E3%80%8C%E3%82%B1%E3%82%BB%E3%83%A9%E3%82%BB%E3%83%A9%E3%80%8DOfficial%20Music%20Video.mp4?v=1750427567013"
  },
  {
    title: "Mrs. GREEN APPLE - 僕のこと",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%20-%20%E5%83%95%E3%81%AE%E3%81%93%E3%81%A8.mp4?v=1750427571747"
  },
  {
    title: "Mrs. GREEN APPLE「Magic」",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%E3%80%8CMagic%E3%80%8DOfficial%20Music%20Video.mp4?v=1750427572640"
  },
  {
    title: "Mrs. GREEN APPLE「ライラック」",
    src: "https://cdn.glitch.me/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%E3%80%8C%E3%83%A9%E3%82%A4%E3%83%A9%E3%83%83%E3%82%AF%E3%80%8DOfficial%20Music%20Video.mp4?v=1750427581058"
  },
  {
    title: "Mrs. GREEN APPLE - インフェルノ",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%20-%20%E3%82%A4%E3%83%B3%E3%83%95%E3%82%A7%E3%83%AB%E3%83%8E%EF%BC%88Inferno%EF%BC%89.mp4?v=1750427583988"
  },
  {
    title: "Mrs. GREEN APPLE「Soranji」",
    src: "https://cdn.glitch.me/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%E3%80%8CSoranji%E3%80%8DOfficial%20Music%20Video.mp4?v=1750427589166"
  },
  {
    title: "Mrs. GREEN APPLE - 青と夏",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%20-%20%E9%9D%92%E3%81%A8%E5%A4%8F.mp4?v=1750427591836"
  },
  {
    title: "Mrs. GREEN APPLE - WanteD! WanteD!",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%20-%20WanteD!%20WanteD!.mp4?v=1750427594123"
  },
  {
    title: "Mrs. GREEN APPLE - StaRt",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%20-%20StaRt.mp4?v=1750427599234"
  },
  {
    title: "DISH／／ - 猫",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/DISH%EF%BC%8F%EF%BC%8F%20-%20%E7%8C%AB%20%5BOfficial%20Live%20Video%202019%5D.mp4?v=1750427606488"
  },
  {
    title: "GReeeeN - キセキ",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/GReeeeN%20-%20%E3%82%AD%E3%82%BB%E3%82%AD.mp4?v=1750427614450"
  },
  {
    title: "King Gnu - TWILIGHT!!!",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/King%20Gnu%20-%20TWILIGHT!!!.mp4?v=1750427617021"
  },
  {
    title: "back number - 水平線",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/back%20number%20-%20%E6%B0%B4%E5%B9%B3%E7%B7%9A.mp4?v=1750427623008"
  },
  {
    title: "Mrs. GREEN APPLE – 点描の唄",
    src: "https://cdn.glitch.me/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%20%E2%80%93%20%E7%82%B9%E6%8F%8F%E3%81%AE%E5%94%84%E3%80%90LIVE%20from%20%E3%82%BB%E3%82%99%E3%83%B3%E3%82%B7%E3%82%99%E3%83%B3%E6%9C%AA%E5%88%B0%E3%81%A8%E3%82%A6%E3%82%99%E3%82%A7%E3%83%AB%E3%83%88%E3%83%A9%E3%82%A6%E3%83%A0%E3%80%9C%E9%8A%98%E9%8A%98%E7%B7%A8%E3%80%9C%E3%80%91.mp4?v=1750427626293"
  },
  {
    title: "【AKASAKI】Bunny Girl ／ バニーガール",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%80%90AKASAKI%E3%80%91Bunny%20Girl%20%EF%BC%8F%20%E3%83%8F%E3%82%99%E3%83%8B%E3%83%BC%E3%82%AB%E3%82%99%E3%83%BC%E3%83%AB%EF%BC%88Lyric%20Video%EF%BC%89.mp4?v=1750427631068"
  },
  {
    title: "DAOKO × 米津玄師『打上花火』",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/DAOKO%20%C3%97%20%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%AB%E3%80%8E%E6%89%93%E4%B8%8A%E8%8A%B1%E7%81%AB%E3%80%8FMUSIC%20VIDEO.mp4?v=1750427640025"
  },
  {
    title: "Creepy Nuts - のびしろ(NOBISHIRO)",
    src: "https://cdn.glitch.me/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%80%90MV%E3%80%91Creepy%20Nuts%20-%20%E3%81%AE%E3%81%B2%E3%82%99%E3%81%97%E3%82%8D(NOBISHIRO).mp4?v=1750427645681"
  },
  {
    title: "Da-iCE ／「I wonder」",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Da-iCE%20%EF%BC%8F%E3%80%8CI%20wonder%E3%80%8DPerformance%20Video.mp4?v=1750427645852"
  },
  {
    title: "「前前前世」",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/RADWIMPS%20-%20%E5%89%8D%E5%89%8D%E5%89%8D%E4%B8%96%20(movie%20ver.)%20%5BOfficial%20Music%20Video%5D.mp4?v=1750911750416"
  },
    {
    title: "ビリミリオン",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E5%84%AA%E9%87%8C%E3%80%8E%E3%83%92%E3%82%99%E3%83%AA%E3%83%9F%E3%83%AA%E3%82%AA%E3%83%B3%E3%80%8FOfficial%20Music%20Video.mp4?v=1750940890648" // ←リンクを後で追加してください
  },
  {
    title: "１１５万キロのフィルム",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Official%E9%AB%AD%E7%94%B7dism%20-%20115%E4%B8%87%E3%82%AD%E3%83%AD%E3%81%AE%E3%83%95%E3%82%A3%E3%83%AB%E3%83%A0%EF%BC%BBOfficial%20Audio%EF%BC%BD.mp4?v=1750940873834"
  },
  {
    title: "ピーターパン",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/1-%E5%84%AA%E9%87%8C%20%E3%80%8E%E3%83%92%E3%82%9A%E3%83%BC%E3%82%BF%E3%83%BC%E3%83%8F%E3%82%9A%E3%83%B3%E3%80%8FOfficial%20Music%20Video%EF%BC%88%E3%83%95%E3%83%AB%EF%BC%89.mp4?v=1750940988523"
  },
  {
    title: "W/X/Y",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/W%EF%BC%8FX%EF%BC%8FY%20-%20Tani%20Yuuki%20(Official%20Lyric%20Video).mp4?v=1750940938566"
  },
  {
    title: "晩餐歌",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/tuki.%E3%80%8E%E6%99%A9%E9%A4%90%E6%AD%8C%E3%80%8FOfficial%20Music%20Video.mp4?v=1750940915920"
  },
  {
    title: "さよならエレジー",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E8%8F%85%E7%94%B0%E5%B0%86%E6%9A%89%20%E3%80%8E%E3%81%95%E3%82%88%E3%81%AA%E3%82%89%E3%82%A8%E3%83%AC%E3%82%B7%E3%82%99%E3%83%BC%E3%80%8F.mp4?v=1750940939916"
  },
  {
    title: "白日",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/King%20Gnu%20-%20%E7%99%BD%E6%97%A5.mp4?v=1750940958249"
  },
  {
    title: "ノーダウト",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Official%E9%AB%AD%E7%94%B7dism%20-%20%E3%83%8E%E3%83%BC%E3%82%BF%E3%82%99%E3%82%A6%E3%83%88%EF%BC%BBOfficial%20Video%EF%BC%BD.mp4?v=1750940978797"
  },
  {
    title: "春泥棒",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%83%A8%E3%83%AB%E3%82%B7%E3%82%AB%20-%20%E6%98%A5%E6%B3%A5%E6%A3%92%EF%BC%88OFFICIAL%20VIDEO%EF%BC%89.mp4?v=1750940915732"
  },
  {
    title: "スターマイン",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Da-iCE%20%EF%BC%8F%20%E3%80%8C%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%9E%E3%82%A4%E3%83%B3%E3%80%8DMusic%20Video.mp4?v=1750940930593"
  },
  { 
    title: "裸の心",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%81%82%E3%81%84%E3%81%BF%E3%82%87%E3%82%93%20-%20%E8%A3%B8%E3%81%AE%E5%BF%83%E3%80%90OFFICIAL%20MUSIC%20VIDEO%E3%80%91.mp4?v=1750940992516"
  },
  {
    title: "相思相愛",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E7%9B%B8%E6%80%9D%E7%9B%B8%E6%84%9B.mp4?v=1750940940155"
  },
  {
    title: "ヨワネハキ",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%80%90102%E3%80%91%5Bfeat.%20%E5%92%8C%E3%81%AC%E3%81%8B%2C%20asmi%5D%20%E3%83%A8%E3%83%AF%E3%83%8D%E3%83%8F%E3%82%AD%20%20%EF%BC%8F%20MAISONdes.mp4?v=1750940993474"
  },
  {
    title: "渡月橋",
    src: "https://cdn.glitch.me/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E6%B8%A1%E6%9C%88%E6%A9%8B%20%EF%BD%9E%E5%90%9B%20%E6%83%B3%E3%81%B5%EF%BD%9E%20%E5%80%89%E6%9C%A8%E9%BA%BB%E8%A1%A3%EF%BC%88%E3%83%95%E3%83%AB%EF%BC%89.mp4?v=1750940886750"
  },
  {
    title: "ただ君に晴れ",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%83%A8%E3%83%AB%E3%82%B7%E3%82%AB%20-%20%E3%81%9F%E3%81%9F%E3%82%99%E5%90%9B%E3%81%AB%E6%99%B4%E3%82%8C%20(MUSIC%20VIDEO).mp4?v=1750940912372"
  },
  {
    title: "友よ～この先もずっと・・・",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E5%8F%8B%E3%82%88%20%EF%BD%9E%20%E3%81%93%E3%81%AE%E5%85%88%E3%82%82%E3%81%99%E3%82%99%E3%81%A3%E3%81%A8%EF%BD%A5%EF%BD%A5%EF%BD%A5.mp4?v=1750941341427"
  },
  {
    title: "虹色の戦争",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E8%99%B9%E8%89%B2%E3%81%AE%E6%88%A6%E4%BA%89.mp4?v=1750940996693"
  },
  {
    title: "トリコ",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%83%88%E3%83%AA%E3%82%B3.mp4?v=1750940997543"
  },
  {
    title: "春を告げる",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/yama%20-%20%E6%98%A5%E3%82%92%E5%91%8A%E3%81%91%E3%82%99%E3%82%8B%20(Official%20Video).mp4?v=1750940879930"
  },
  {
    title: "overdose",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E3%81%AA%E3%81%A8%E3%82%8A%20-%20Overdose.mp4?v=1750940893541"
  },
  {
    title: "虹",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E8%99%B9%20-%20%E8%8F%85%E7%94%B0%E5%B0%86%E6%9A%89%EF%BC%88%E3%83%95%E3%83%AB%EF%BC%89.mp4?v=1750940920975"
  },
  {
    title: "アイノカタチ",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/MISIA%20-%20%E3%82%A2%E3%82%A4%E3%83%8E%E3%82%AB%E3%82%BF%E3%83%81%20feat.HIDE(GReeeeN)%20%EF%BC%88Official%20Music%20Video%EF%BC%89.mp4?v=1750940887757"
  },
  {
    title: "香水",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/%E9%A6%99%E6%B0%B4%20%20%EF%BC%8F%20%20%E7%91%9B%E4%BA%BA%20(Official%20Music%20Video).mp4?v=1750940926267"
  },
  {
    title: "クスシキ",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/Mrs.%20GREEN%20APPLE%E3%80%8C%E3%82%AF%E3%82%B9%E3%82%B7%E3%82%AD%E3%80%8DOfficial%20Music%20Video.mp4?v=1751186862853"
  },
　{
    title: "正解",
    src: "https://cdn.glitch.me/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/RADWIMPS%20-%20%E6%AD%A3%E8%A7%A3%20%5BOfficial%20Music%20Video%5D.mp4?v=1751186868572"
  },
  {
    title: "only my railgun",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/fripSide%EF%BC%8Fonly%20my%20railgun(Full)%EF%BC%8AOfficial%20Music%20Video.mp4?v=1751186855696"
  },
  {
    title: "ワンダイレクション　onethink",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/One%20Direction%20-%20One%20Thing.mp4?v=1751493862672"
  },
  {
    title: "What makes you beautiful",
    src: "https://cdn.glitch.global/1a7b0d9f-053a-4c34-817e-4c9c9da5b28a/One%20Direction%20-%20What%20Makes%20You%20Beautiful%20(Official%20Video).mp4?v=1751493861888"
  },
  // ...全曲分続けて追加...
];

if (typeof module !== 'undefined' && module.exports) {
  // Node.js環境（サーバー側）
  module.exports = tracks;
} else {
  // ブラウザ環境（フロントエンド側）
  window.tracks = tracks;
}