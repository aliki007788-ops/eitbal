/* ===========================================
   MODULE: SIDEBAR - منوی کناری
   نسخه: 2.0.0
   وضعیت: ✅ مستقل
=========================================== */

const Sidebar = {
  // ========== INITIALIZE ==========
  init() {
    this.render();
    
    // Hamburger click
    document.addEventListener('click', (e) => {
      if (e.target.closest('.crystal-hamburger')) {
        this.toggle();
      }
    });
    
    // Subscribe to user changes
    Royal.subscribe('user', () => this.update());
    Royal.subscribe('stats', () => this.update());
    Royal.subscribe('title', () => this.update());
    
    console.log('✅ Sidebar module initialized');
  },
  
  // ========== RENDER ==========
  render() {
    // Hamburger
    if (!document.querySelector('.crystal-hamburger')) {
      const hamburger = document.createElement('div');
      hamburger.className = 'crystal-hamburger';
      hamburger.innerHTML = `
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
      `;
      document.body.appendChild(hamburger);
    }
    
    // Sidebar
    if (!document.querySelector('.royal-sidebar')) {
      const sidebar = document.createElement('div');
      sidebar.className = 'royal-sidebar';
      sidebar.innerHTML = this._getHTML();
      document.body.appendChild(sidebar);
    }
    
    // Overlay
    if (!document.querySelector('.golden-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'golden-overlay';
      document.body.appendChild(overlay);
    }
  },
  
  // ========== UPDATE ==========
  update() {
    const sidebar = document.querySelector('.royal-sidebar');
    if (sidebar) {
      sidebar.innerHTML = this._getHTML();
    }
  },
  
  // ========== GET HTML ==========
  _getHTML() {
    const user = Royal.get('user');
    const stats = Royal.get('stats');
    const title = this._getUserTitle();
    
    return `
      <div class="sidebar-crown">
        <div class="crown-avatar">⚽</div>
        <div class="sidebar-user-name">${user.name || 'کاربر مهمان'}</div>
        <div class="sidebar-user-title">
          <span>${title.emoji} ${title.name}</span>
          <span>🎯 ${stats.correctPredictions}</span>
        </div>
      </div>
      
      <div class="sidebar-menu">
        ${this._renderMenuItem('🏠', 'خانه', 'home')}
        ${this._renderMenuItem('🏆', 'لیگ برتر', 'league')}
        ${this._renderMenuItem('📅', 'مسابقات', 'matches')}
        ${this._renderMenuItem('📰', 'اخبار', 'news', 'live')}
        ${this._renderMenuItem('🎯', 'پیش‌بینی', 'predict')}
        ${this._renderMenuItem('👥', 'تیم من', 'team')}
        ${this._renderMenuItem('⭐', 'رأی‌گیری', 'vote')}
        ${this._renderMenuItem('👆', 'تپ', 'tap')}
        ${this._renderMenuItem('🛒', 'فروشگاه', 'shop', 'new')}
        ${this._renderMenuItem('💬', 'چت', 'chat')}
      </div>
      
      <div class="sidebar-footer">
        <div style="display: flex; justify-content: space-between; color: var(--text-secondary); font-size: 13px;">
          <span>💰 ${Utils.formatNumber(stats.coins)} سکه</span>
          <span>⚡ ${stats.energy}/${stats.maxEnergy}</span>
        </div>
      </div>
    `;
  },
  
  _renderMenuItem(icon, text, page, badge = null) {
    const isActive = Router.currentPage === page ? 'active' : '';
    
    return `
      <div class="menu-item ${isActive}" onclick="Router.goTo('${page}'); Sidebar.close()">
        <span class="menu-icon">${icon}</span>
        <span class="menu-text">${text}</span>
        ${badge ? `<span class="menu-badge">${badge}</span>` : ''}
      </div>
    `;
  },
  
  _getUserTitle() {
    const correct = Royal.get('stats.correctPredictions') || 0;
    
    const titles = [
      { min: 0, name: 'فوتبالی', emoji: '⚽' },
      { min: 5, name: 'طرفدار برنزی', emoji: '🥉' },
      { min: 10, name: 'طرفدار نقره‌ای', emoji: '🥈' },
      { min: 15, name: 'طرفدار طلایی', emoji: '🥇' },
      { min: 20, name: 'کاردان فوتبال', emoji: '📘' },
      { min: 30, name: 'کارشناس', emoji: '🎙️' },
      { min: 45, name: 'کارشناس ارشد', emoji: '🏆' },
      { min: 75, name: 'تحلیلگر', emoji: '📊' },
      { min: 100, name: 'تحلیلگر فوتبال', emoji: '🎯' },
      { min: 150, name: 'تحلیلگر ارشد', emoji: '💎' },
      { min: 200, name: 'تحلیلگر خبره', emoji: '👑' },
      { min: 300, name: 'استاد تحلیل', emoji: '🌟' }
    ];
    
    for (let i = titles.length - 1; i >= 0; i--) {
      if (correct >= titles[i].min) {
        return titles[i];
      }
    }
    
    return titles[0];
  },
  
  // ========== TOGGLE ==========
  toggle() {
    document.querySelector('.crystal-hamburger')?.classList.toggle('active');
    document.querySelector('.royal-sidebar')?.classList.toggle('active');
    document.querySelector('.golden-overlay')?.classList.toggle('active');
  },
  
  close() {
    document.querySelector('.crystal-hamburger')?.classList.remove('active');
    document.querySelector('.royal-sidebar')?.classList.remove('active');
    document.querySelector('.golden-overlay')?.classList.remove('active');
  }
};

window.Sidebar = Sidebar;