/* ===========================================
   MODULE: BOTTOM NAV - منوی پایین
   نسخه: 2.0.0
   وضعیت: ✅ مستقل
=========================================== */

const BottomNav = {
  // ========== INITIALIZE ==========
  init() {
    this.render();
    
    Events.on('route:change', (data) => {
      this.setActive(data.path);
    });
    
    console.log('✅ BottomNav module initialized');
  },
  
  // ========== RENDER ==========
  render() {
    if (document.querySelector('.royal-bottom-nav')) return;
    
    const nav = document.createElement('nav');
    nav.className = 'royal-bottom-nav';
    nav.innerHTML = this._getHTML();
    document.body.appendChild(nav);
  },
  
  // ========== GET HTML ==========
  _getHTML() {
    return `
      <div class="nav-item ${Router.currentPage === 'home' ? 'active' : ''}" onclick="Router.goTo('home')">
        <span class="nav-icon">🏠</span>
        <span class="nav-label">خانه</span>
      </div>
      <div class="nav-item ${Router.currentPage === 'league' ? 'active' : ''}" onclick="Router.goTo('league')">
        <span class="nav-icon">🏆</span>
        <span class="nav-label">لیگ</span>
      </div>
      <div class="nav-item ${Router.currentPage === 'matches' ? 'active' : ''}" onclick="Router.goTo('matches')">
        <span class="nav-icon">📅</span>
        <span class="nav-label">مسابقات</span>
      </div>
      <div class="nav-item ${Router.currentPage === 'news' ? 'active' : ''}" onclick="Router.goTo('news')">
        <span class="nav-icon">📰</span>
        <span class="nav-label">اخبار</span>
      </div>
      
      <div class="crown-button" onclick="ExtraMenu.toggle()">
        <span class="crown-icon">👑</span>
      </div>
    `;
  },
  
  // ========== SET ACTIVE ==========
  setActive(page) {
    document.querySelectorAll('.nav-item').forEach((item, index) => {
      const pages = ['home', 'league', 'matches', 'news'];
      item.classList.toggle('active', pages[index] === page);
    });
  }
};

window.BottomNav = BottomNav;