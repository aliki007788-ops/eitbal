/* ===========================================
   MODULE: HEADER - هدر اصلی
   نسخه: 2.0.0
   وضعیت: ✅ مستقل
=========================================== */

const Header = {
  // ========== INITIALIZE ==========
  init() {
    // Render header
    this.render();
    
    // Subscribe to state changes
    Royal.subscribe('user', () => this.update());
    Royal.subscribe('stats.streak', () => this.update());
    Royal.subscribe('stats.coins', () => this.update());
    
    console.log('✅ Header module initialized');
  },
  
  // ========== RENDER ==========
  render() {
    const header = document.querySelector('.royal-header');
    if (header) return header.innerHTML = this._getHTML();
    
    const headerHTML = `
      <header class="royal-header">
        ${this._getHTML()}
      </header>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  },
  
  // ========== UPDATE ==========
  update() {
    const header = document.querySelector('.royal-header');
    if (header) {
      header.innerHTML = this._getHTML();
    }
  },
  
  // ========== GET HTML ==========
  _getHTML() {
    const user = Royal.get('user');
    const stats = Royal.get('stats');
    const isPremium = Royal.isPremium();
    
    return `
      <div class="royal-logo">
        <div class="logo-icon">👑</div>
        <div class="logo-text">
          ایتبال
          ${isPremium ? '<span style="background: var(--gold); color: black; padding: 4px 12px; border-radius: 30px; font-size: 11px; margin-right: 8px;">رویال</span>' : ''}
        </div>
      </div>
      
      <div class="header-content">
        <div class="royal-streak" onclick="Streak.showModal()">
          <span class="streak-icon">🔥</span>
          <span class="streak-number">${stats.streak}</span>
          <span style="color: var(--text-secondary); font-size: 13px;">روز</span>
        </div>
        
        <div class="header-user" onclick="Auth._showAuthModal()" style="cursor: pointer;">
          <span style="font-size: 24px;">${user.gender === 'female' ? '👩' : user.gender === 'male' ? '👨' : '👤'}</span>
          <span style="color: var(--text-secondary); font-size: 14px;">${user.name || 'ورود'}</span>
        </div>
      </div>
    `;
  }
};

window.Header = Header;