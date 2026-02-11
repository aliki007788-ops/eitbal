-- ===========================================
-- DATABASE SCHEMA - Firebase Realtime DB
-- نسخه: 2.0.0
-- ===========================================

-- Users Collection
{
  "users": {
    "$userId": {
      "id": "string",
      "phone": "string",
      "name": "string",
      "gender": "string",
      "avatar": "string",
      "joinDate": "timestamp",
      "lastLogin": "timestamp",
      "isPremium": "boolean",
      "premiumExpiry": "timestamp",
      
      "stats": {
        "streak": "number",
        "coins": "number",
        "energy": "number",
        "maxEnergy": "number",
        "points": "number",
        "correctPredictions": "number",
        "totalPredictions": "number",
        "tapCount": "number",
        "todayTap": "number",
        "invites": "number"
      },
      
      "inventory": {
        "frames": ["string"],
        "activeFrame": "string",
        "skins": ["string"],
        "activeSkin": "string",
        "boosts": [{
          "value": "number",
          "expiry": "timestamp"
        }]
      },
      
      "predictions": [{
        "matchId": "number",
        "result": "string",
        "exactScore": "string",
        "timestamp": "timestamp",
        "status": "string"
      }],
      
      "team": ["number"],
      
      "votes": {
        "$targetId": {
          "female": "number",
          "male": "number",
          "total": "number"
        }
      }
    }
  }
}

-- Matches Collection
{
  "matches": {
    "$matchId": {
      "id": "number",
      "week": "number",
      "home": "string",
      "homeIcon": "string",
      "homeRank": "number",
      "homePoints": "number",
      "away": "string",
      "awayIcon": "string",
      "awayRank": "number",
      "awayPoints": "number",
      "date": "string",
      "time": "string",
      "stadium": "string",
      "city": "string",
      "referee": "string",
      "status": "string",
      "homeScore": "number",
      "awayScore": "number"
    }
  }
}

-- League Table
{
  "league": {
    "table": [{
      "rank": "number",
      "name": "string",
      "icon": "string",
      "played": "number",
      "win": "number",
      "draw": "number",
      "loss": "number",
      "gf": "number",
      "ga": "number",
      "gd": "number",
      "points": "number",
      "form": ["string"]
    }],
    
    "topScorers": [{
      "rank": "number",
      "name": "string",
      "team": "string",
      "goals": "number",
      "assists": "number",
      "matches": "number"
    }],
    
    "topAssists": [{
      "rank": "number",
      "name": "string",
      "team": "string",
      "assists": "number",
      "goals": "number",
      "matches": "number"
    }],
    
    "cleanSheets": [{
      "rank": "number",
      "name": "string",
      "team": "string",
      "cleanSheets": "number",
      "saves": "number",
      "matches": "number"
    }]
  }
}

-- News Collection
{
  "news": {
    "$newsId": {
      "id": "string",
      "source": "string",
      "sourceIcon": "string",
      "title": "string",
      "summary": "string",
      "time": "string",
      "timestamp": "timestamp",
      "views": "number",
      "comments": "number",
      "likes": "number",
      "category": "string",
      "image": "string",
      "url": "string"
    }
  }
}

-- Chat Messages
{
  "chat": {
    "$messageId": {
      "id": "string",
      "userId": "string",
      "userName": "string",
      "gender": "string",
      "isPremium": "boolean",
      "text": "string",
      "timestamp": "timestamp"
    }
  }
}

-- Transactions
{
  "transactions": {
    "$transactionId": {
      "id": "string",
      "userId": "string",
      "planId": "string",
      "planName": "string",
      "amount": "number",
      "coins": "number",
      "bonus": "number",
      "type": "string",
      "status": "string",
      "paymentId": "string",
      "timestamp": "timestamp",
      "completedAt": "timestamp"
    }
  }
}