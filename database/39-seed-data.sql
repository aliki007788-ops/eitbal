-- ===========================================
-- SEED DATA - داده‌های اولیه
-- نسخه: 2.0.0
-- ===========================================

-- Initial League Data
INSERT INTO `league/table` VALUES [
  {
    "rank": 1,
    "name": "تراکتور",
    "icon": "🔴",
    "played": 19,
    "win": 8,
    "draw": 9,
    "loss": 2,
    "gf": 24,
    "ga": 9,
    "gd": 15,
    "points": 33,
    "form": ["win", "win", "draw", "win", "draw"]
  },
  {
    "rank": 2,
    "name": "سپاهان",
    "icon": "🟡🔴",
    "played": 19,
    "win": 9,
    "draw": 6,
    "loss": 4,
    "gf": 20,
    "ga": 11,
    "gd": 9,
    "points": 33,
    "form": ["draw", "draw", "loss", "draw", "draw"]
  },
  {
    "rank": 3,
    "name": "پرسپولیس",
    "icon": "🔴",
    "played": 18,
    "win": 8,
    "draw": 7,
    "loss": 3,
    "gf": 20,
    "ga": 13,
    "gd": 7,
    "points": 31,
    "form": ["loss", "win", "loss", "win", "win"]
  }
];

-- Initial Matches
INSERT INTO `matches` VALUES [
  {
    "id": 1,
    "week": 18,
    "home": "تراکتور",
    "homeIcon": "🔴",
    "homeRank": 1,
    "homePoints": 33,
    "away": "استقلال",
    "awayIcon": "🔵",
    "awayRank": 5,
    "awayPoints": 28,
    "date": "۱۴۰۴/۱۱/۲۴",
    "time": "۲۰:۳۰",
    "stadium": "آزادی",
    "city": "تهران",
    "referee": "بیژن حیدری",
    "status": "upcoming"
  },
  {
    "id": 2,
    "week": 18,
    "home": "پرسپولیس",
    "homeIcon": "🔴",
    "homeRank": 3,
    "homePoints": 31,
    "away": "سپاهان",
    "awayIcon": "🟡🔴",
    "awayRank": 2,
    "awayPoints": 33,
    "date": "۱۴۰۴/۱۱/۲۳",
    "time": "۱۹:۳۰",
    "stadium": "نقش جهان",
    "city": "اصفهان",
    "referee": "موعود بنیادی‌فر",
    "status": "upcoming"
  }
];

-- Initial Products
INSERT INTO `shop/products` VALUES [
  {
    "id": "frame_gold",
    "name": "قاب طلایی",
    "icon": "🖼️",
    "description": "قاب اختصاصی پروفایل با افکت طلایی",
    "price": 29000,
    "type": "frame",
    "value": "gold",
    "category": "decoration",
    "sales": 2345
  },
  {
    "id": "premium_month",
    "name": "اشتراک رویال ماهانه",
    "icon": "👑",
    "description": "۳۰ روز دسترسی ویژه",
    "price": 99000,
    "type": "premium",
    "value": 30,
    "category": "subscription",
    "sales": 567,
    "discount": 40,
    "features": [
      "✨ بوستر دائمی ۱.۵×",
      "🖼️ قاب طلایی رایگان",
      "💬 اسم طلایی در چت",
      "⚡ ظرفیت انرژی +۵۰۰"
    ]
  }
];