/* ===========================================
   CORE ENGINE - موتور اصلی برنامه
   نسخه: 2.0.0
   تغییر: ❌ ممنوع - دست نزنید
=========================================== */

const Royal = {
  // ========== STATE MANAGEMENT ==========
  _state: {
    // User Data
    user: {
      id: null,
      phone: null,
      name: null,
      gender: null,
      avatar: '👤',
      joinDate: null,
      lastLogin: null,
      isPremium: false,
      premiumExpiry: null
    },
    
    // Stats
    stats: {
      streak: 0,
      coins: 0,
      energy: 1000,
      maxEnergy: 1000,
      points: 0,
      correctPredictions: 0,
      totalPredictions: 0,
      tapCount: 0,
      todayTap: 0,
      invites: 0
    },
    
    // Purchased Items
    inventory: {
      frames: [],
      activeFrame: null,
      skins: [],
      activeSkin: null,
      boosts: []
    },
    
    // Predictions
    predictions: [],
    
    // Votes
    votes: {},
    
    // Team
    team: [],
    
    // Chat
    chat: {
      messages: [],
      online: 0,
      typing: []
    },
    
    // Settings
    settings: {
      theme: 'dark',
      notifications: true,
      language: 'fa'
    }
  },
  
  _listeners: new Map(),
  _initialized: false,
  
  // ========== INITIALIZE ==========
  async init() {
    if (this._initialized) return;
    
    console.log('🚀 Royal Engine v2.0.0 starting...');
    
    // 1. Load from localStorage
    this._load();
    
    // 2. Initialize Eitaa SDK
    await this._initEitaa();
    
    // 3. Authenticate user
    await this._initAuth();
    
    // 4. Load from Firebase
    await this._loadFromFirebase();
    
    // 5. Check daily streak
    this._checkStreak();
    
    // 6. Initialize modules
    await this._initModules();
    
    // 7. Start router
    Router.setContainer('#app');
    
    // 8. Render home page
    Router.goTo('home');
    
    this._initialized = true;
    this._save();
    
    Events.emit('app:ready', this._state);
    console.log('✅ Royal Engine initialized');
    
    return this;
  },
  
  // ========== EITAA SDK ==========
  async _initEitaa() {
    return new Promise((resolve) => {
      if (window.Eitaa?.WebApp) {
        window.Eitaa.WebApp.ready();
        window.Eitaa.WebApp.expand();
        window.Eitaa.WebApp.setHeaderColor?.('#0A0A0F');
        
        // Theme params
        const theme = window.Eitaa.WebApp.themeParams;
        if (theme) {
          document.documentElement.style.setProperty('--bg-primary', theme.bg_color || '#0A0A0F');
          document.documentElement.style.setProperty('--text-primary', theme.text_color || '#FFFFFF');
          document.documentElement.style.setProperty('--gold', theme.link_color || '#FFD700');
        }
        
        // Main Button
        if (window.Eitaa.WebApp.MainButton) {
          window.Eitaa.WebApp.MainButton.setParams({
            color: '#FFD700',
            text_color: '#0A0A0F'
          });
        }
        
        // Back Button
        if (window.Eitaa.WebApp.BackButton) {
          window.Eitaa.WebApp.BackButton.onClick(() => {
            Router.back();
          });
        }
        
        console.log('✅ Eitaa SDK initialized');
        resolve();
      } else {
        console.warn('⚠️ Eitaa SDK not found, using fallback');
        
        // Fallback
        window.Eitaa = window.Eitaa || {};
        window.Eitaa.WebApp = {
          ready: () => {},
          expand: () => {},
          close: () => {},
          openLink: (url) => window.open(url, '_blank'),
          hapticFeedback: {
            impactOccurred: () => {},
            notificationOccurred: () => {}
          },
          MainButton: {
            setText: () => {},
            show: () => {},
            hide: () => {},
            onClick: () => {},
            enable: () => {},
            disable: () => {}
          },
          BackButton: {
            show: () => {},
            hide: () => {},
            onClick: () => {}
          }
        };
        resolve();
      }
    });
  },
  
  // ========== AUTHENTICATION ==========
  async _initAuth() {
    // Check for test user from index.html first
    const testUser = localStorage.getItem('eitabal_user');
    if (testUser) {
      const userData = JSON.parse(testUser);
      this._state.user.id = userData.id;
      this._state.user.phone = userData.phone;
      this._state.user.name = userData.name;
      this._state.user.gender = userData.gender;
      this._state.user.avatar = userData.gender === 'female' ? '👩' : '👨';
      this._state.user.joinDate = userData.joinDate;
      this._state.user.isPremium = userData.isPremium || false;
      
      console.log('✅ User authenticated from localStorage:', this._state.user.name);
      return true;
    }
    
    // Fallback to Eitaa SDK
    const eitaaUser = window.Eitaa?.WebApp?.initDataUnsafe?.user;
    
    if (eitaaUser) {
      this._state.user.id = `eitaa_${eitaaUser.id}`;
      this._state.user.phone = eitaaUser.phone_number || null;
      this._state.user.name = eitaaUser.first_name || 'کاربر';
      
      // Try to load saved gender
      const savedGender = localStorage.getItem('eitabal_gender');
      if (savedGender) {
        this._state.user.gender = savedGender;
      }
      
      console.log('✅ User authenticated:', this._state.user.name);
      return true;
    }
    
    console.warn('⚠️ User not authenticated');
    return false;
  },
  
  // ========== FIREBASE ==========
  async _loadFromFirebase() {
    if (!DB) {
      console.warn('⚠️ Firebase not available');
      return;
    }
    
    try {
      const userId = this._state.user.id;
      if (!userId) return;
      
      const userData = await DB.getUser(userId);
      if (userData) {
        this._state.stats = { ...this._state.stats, ...userData.stats };
        this._state.inventory = { ...this._state.inventory, ...userData.inventory };
        this._state.predictions = userData.predictions || [];
        this._state.team = userData.team || [];
        this._state.votes = userData.votes || {};
        
        console.log('✅ Data loaded from Firebase');
      }
    } catch (error) {
      console.error('❌ Firebase load error:', error);
    }
  },
  
  // ========== STREAK CHECK ==========
  _checkStreak() {
    const today = new Date().toDateString();
    const lastLogin = this._state.user.lastLogin;
    
    if (lastLogin === today) return;
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastLogin === yesterday.toDateString()) {
      this._state.stats.streak += 1;
      Events.emit('streak:increased', this._state.stats.streak);
      
      // Bonus for streak milestones
      if (this._state.stats.streak % 7 === 0) {
        this._addReward('weekly_streak');
      }
    } else {
      this._state.stats.streak = 1;
    }
    
    this._state.user.lastLogin = today;
  },
  
  // ========== MODULES INIT ==========
  async _initModules() {
    const modules = [
      Auth, Streak, Prediction, Team, Vote, 
      Tap, Shop, Chat, League, News
    ];
    
    for (const module of modules) {
      if (module?.init) {
        try {
          await module.init();
        } catch (e) {
          console.error(`❌ Module init error:`, e);
        }
      }
    }
  },
  
  // ========== STATE MANAGEMENT ==========
  get(path) {
    if (!path) return this._state;
    
    return path.split('.').reduce((obj, key) => {
      return obj && obj[key] !== undefined ? obj[key] : null;
    }, this._state);
  },
  
  set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => {
      if (!obj[key]) obj[key] = {};
      return obj[key];
    }, this._state);
    
    if (target[lastKey] !== value) {
      target[lastKey] = value;
      this._notify(path, value);
      this._save();
    }
    
    return this;
  },
  
  update(path, fn) {
    const current = this.get(path);
    const newValue = fn(current);
    this.set(path, newValue);
    return newValue;
  },
  
  // ========== PERSISTENCE ==========
  _save() {
    try {
      const state = {
        user: {
          id: this._state.user.id,
          gender: this._state.user.gender,
          isPremium: this._state.user.isPremium,
          premiumExpiry: this._state.user.premiumExpiry
        },
        stats: this._state.stats,
        inventory: this._state.inventory,
        predictions: this._state.predictions,
        team: this._state.team,
        votes: this._state.votes
      };
      
      localStorage.setItem('royal_store', JSON.stringify(state));
      
      // Sync to Firebase
      if (DB && this._state.user.id) {
        DB.saveUser(this._state.user.id, state);
      }
    } catch (e) {
      console.error('❌ Save error:', e);
    }
  },
  
  _load() {
    try {
      const saved = localStorage.getItem('royal_store');
      if (saved) {
        const data = JSON.parse(saved);
        this._state.user = { ...this._state.user, ...data.user };
        this._state.stats = { ...this._state.stats, ...data.stats };
        this._state.inventory = { ...this._state.inventory, ...data.inventory };
        this._state.predictions = data.predictions || [];
        this._state.team = data.team || [];
        this._state.votes = data.votes || {};
        
        console.log('✅ Data loaded from localStorage');
      }
    } catch (e) {
      console.error('❌ Load error:', e);
    }
  },
  
  // ========== EVENTS ==========
  _notify(path, value) {
    Events.emit('state:change', { path, value });
    Events.emit(`state:${path}`, value);
  },
  
  subscribe(path, callback) {
    return Events.on(`state:${path}`, callback);
  },
  
  // ========== REWARDS ==========
  _addReward(type) {
    switch(type) {
      case 'weekly_streak':
        this._state.stats.coins += 500;
        Events.emit('reward:weekly', 500);
        Toast.show('🎁 ۵۰۰ سکه پاداش حضور ۷ روزه!', 'gold');
        break;
    }
  },
  
  // ========== HAPTIC FEEDBACK ==========
  haptic(type = 'light') {
    try {
      window.Eitaa.WebApp.hapticFeedback?.impactOccurred?.(type);
    } catch (e) {}
  },
  
  // ========== UTILITIES ==========
  isPremium() {
    if (!this._state.user.isPremium) return false;
    if (!this._state.user.premiumExpiry) return false;
    
    const expiry = new Date(this._state.user.premiumExpiry);
    const now = new Date();
    
    if (expiry < now) {
      this._state.user.isPremium = false;
      this._state.user.premiumExpiry = null;
      this._save();
      return false;
    }
    
    return true;
  }
};

// Global reference - THIS IS REQUIRED!
window.Royal = Royal;
