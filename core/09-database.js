/* ===========================================
   CORE DATABASE - Firebase Manager
   نسخه: 2.0.0
   تغییر: ❌ ممنوع - دست نزنید
=========================================== */

const DB = {
  // ========== FIREBASE CONFIG ==========
  _config: {
    apiKey: "AIzaSyB7sFmYQmYQmYQmYQmYQmYQmYQmYQmYQmY",
    authDomain: "eitabal-royal.firebaseapp.com",
    databaseURL: "https://eitabal-royal-default-rtdb.firebaseio.com",
    projectId: "eitabal-royal",
    storageBucket: "eitabal-royal.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
  },
  
  _app: null,
  _database: null,
  _auth: null,
  _firestore: null,
  _initialized: false,
  
  // ========== INITIALIZE ==========
  async init() {
    if (this._initialized) return;
    
    try {
      // Initialize Firebase
      this._app = firebase.initializeApp(this._config);
      this._database = firebase.database();
      this._auth = firebase.auth();
      this._firestore = firebase.firestore();
      
      // Enable offline persistence
      await this._firestore.enablePersistence({
        synchronizeTabs: true
      }).catch(err => {
        console.warn('⚠️ Firestore persistence failed:', err);
      });
      
      this._initialized = true;
      console.log('✅ Firebase initialized');
      
      // Start sync
      this._startSync();
      
    } catch (error) {
      console.error('❌ Firebase init error:', error);
    }
  },
  
  // ========== USER METHODS ==========
  async getUser(userId) {
    try {
      const snapshot = await this._database.ref(`users/${userId}`).once('value');
      return snapshot.val();
    } catch (error) {
      console.error('❌ Get user error:', error);
      return null;
    }
  },
  
  async saveUser(userId, data) {
    try {
      await this._database.ref(`users/${userId}`).update({
        ...data,
        lastUpdated: firebase.database.ServerValue.TIMESTAMP
      });
      return true;
    } catch (error) {
      console.error('❌ Save user error:', error);
      return false;
    }
  },
  
  // ========== LEAGUE METHODS ==========
  async getLeagueTable() {
    try {
      const snapshot = await this._database.ref('league/table').once('value');
      return snapshot.val() || [];
    } catch (error) {
      console.error('❌ Get league table error:', error);
      return [];
    }
  },
  
  async updateLeagueTable(teams) {
    try {
      await this._database.ref('league/table').set(teams);
      return true;
    } catch (error) {
      console.error('❌ Update league table error:', error);
      return false;
    }
  },
  
  // ========== MATCHES METHODS ==========
  async getMatches(week = null) {
    try {
      let ref = this._database.ref('matches');
      
      if (week) {
        ref = ref.orderByChild('week').equalTo(week);
      }
      
      const snapshot = await ref.once('value');
      const matches = snapshot.val() || {};
      
      return Object.entries(matches).map(([id, match]) => ({
        id,
        ...match
      }));
    } catch (error) {
      console.error('❌ Get matches error:', error);
      return [];
    }
  },
  
  async getLiveMatches() {
    try {
      const now = new Date();
      const matches = await this.getMatches();
      
      return matches.filter(match => {
        if (!match.date || !match.time) return false;
        
        const matchDate = new Date(`${match.date} ${match.time}`);
        const diff = Math.abs(now - matchDate);
        
        return diff < 7200000; // 2 hours
      });
    } catch (error) {
      console.error('❌ Get live matches error:', error);
      return [];
    }
  },
  
  // ========== NEWS METHODS ==========
  async getNews(limit = 20) {
    try {
      const snapshot = await this._database.ref('news')
        .orderByChild('timestamp')
        .limitToLast(limit)
        .once('value');
      
      const news = snapshot.val() || {};
      
      return Object.entries(news)
        .map(([id, item]) => ({ id, ...item }))
        .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('❌ Get news error:', error);
      return [];
    }
  },
  
  async addNews(newsItem) {
    try {
      const ref = this._database.ref('news').push();
      await ref.set({
        ...newsItem,
        id: ref.key,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      return ref.key;
    } catch (error) {
      console.error('❌ Add news error:', error);
      return null;
    }
  },
  
  // ========== VOTE METHODS ==========
  async getVotes(targetId) {
    try {
      const snapshot = await this._database.ref(`votes/${targetId}`).once('value');
      return snapshot.val() || { female: 0, male: 0, total: 0 };
    } catch (error) {
      console.error('❌ Get votes error:', error);
      return { female: 0, male: 0, total: 0 };
    }
  },
  
  async addVote(targetId, gender) {
    try {
      const ref = this._database.ref(`votes/${targetId}/${gender}`);
      await ref.transaction(current => (current || 0) + 1);
      
      // Update total
      await this._database.ref(`votes/${targetId}/total`).transaction(current => (current || 0) + 1);
      
      return true;
    } catch (error) {
      console.error('❌ Add vote error:', error);
      return false;
    }
  },
  
  // ========== CHAT METHODS ==========
  async getMessages(limit = 50) {
    try {
      const snapshot = await this._database.ref('chat')
        .orderByChild('timestamp')
        .limitToLast(limit)
        .once('value');
      
      const messages = snapshot.val() || {};
      
      return Object.entries(messages)
        .map(([id, msg]) => ({ id, ...msg }))
        .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('❌ Get messages error:', error);
      return [];
    }
  },
  
  async sendMessage(message) {
    try {
      const ref = this._database.ref('chat').push();
      await ref.set({
        ...message,
        id: ref.key,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      return ref.key;
    } catch (error) {
      console.error('❌ Send message error:', error);
      return null;
    }
  },
  
  // ========== SUBSCRIPTIONS ==========
  subscribeToLeague(callback) {
    return this._database.ref('league/table').on('value', (snapshot) => {
      callback(snapshot.val() || []);
    });
  },
  
  subscribeToMatches(callback) {
    return this._database.ref('matches').on('value', (snapshot) => {
      const matches = snapshot.val() || {};
      callback(Object.entries(matches).map(([id, match]) => ({ id, ...match })));
    });
  },
  
  subscribeToNews(callback) {
    return this._database.ref('news')
      .orderByChild('timestamp')
      .limitToLast(10)
      .on('value', (snapshot) => {
        const news = snapshot.val() || {};
        callback(Object.entries(news).map(([id, item]) => ({ id, ...item })));
      });
  },
  
  subscribeToChat(callback) {
    return this._database.ref('chat')
      .orderByChild('timestamp')
      .limitToLast(20)
      .on('value', (snapshot) => {
        const messages = snapshot.val() || {};
        callback(Object.entries(messages).map(([id, msg]) => ({ id, ...msg })));
      });
  },
  
  // ========== SYNC ==========
  _startSync() {
    // Sync league data every 5 minutes
    setInterval(async () => {
      try {
        const response = await HTTP.get('/api/league/table');
        if (response) {
          await this.updateLeagueTable(response);
        }
      } catch (e) {
        console.error('❌ League sync error:', e);
      }
    }, 300000);
    
    // Sync news every minute
    setInterval(async () => {
      try {
        const response = await HTTP.get('/api/news/latest');
        if (response && Array.isArray(response)) {
          for (const item of response) {
            await this.addNews(item);
          }
        }
      } catch (e) {
        console.error('❌ News sync error:', e);
      }
    }, 60000);
  }
};

// Initialize
DB.init().catch(console.error);

window.DB = DB;