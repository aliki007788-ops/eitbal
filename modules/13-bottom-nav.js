/* ===========================================
   MODULE: BOTTOM NAV - منوی پایین با دکمه تاجدار ثابت
   نسخه: 2.1.0
   تغییرات: 
   - دکمه تاجدار در وسط و کوچکتر
   - بدون چرخش (فقط حرکت به طرفین)
   - رفع مشکل جایگذاری ماژول‌ها بعد از افکت
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
      <div class="nav-item-royal ${Router.currentPage === 'home' ? 'active' : ''}" onclick="Router.goTo('home')">
        <span class="nav-icon-royal">🏠</span>
        <span class="nav-label-royal">خانه</span>
      </div>
      <div class="nav-item-royal ${Router.currentPage === 'league' ? 'active' : ''}" onclick="Router.goTo('league')">
        <span class="nav-icon-royal">🏆</span>
        <span class="nav-label-royal">لیگ</span>
      </div>
      <div class="nav-item-royal ${Router.currentPage === 'matches' ? 'active' : ''}" onclick="Router.goTo('matches')">
        <span class="nav-icon-royal">📅</span>
        <span class="nav-label-royal">مسابقات</span>
      </div>
      <div class="nav-item-royal ${Router.currentPage === 'news' ? 'active' : ''}" onclick="Router.goTo('news')">
        <span class="nav-icon-royal">📰</span>
        <span class="nav-label-royal">اخبار</span>
      </div>
      
      <!-- دکمه تاجدار ثابت و کوچک -->
      <div class="royal-crown-button-fixed" onclick="ExtraMenu.toggle()">
        <span class="crown-icon-fixed">👑</span>
      </div>
    `;
  },
  
  // ========== SET ACTIVE ==========
  setActive(page) {
    document.querySelectorAll('.nav-item-royal').forEach((item, index) => {
      const pages = ['home', 'league', 'matches', 'news'];
      item.classList.toggle('active', pages[index] === page);
    });
  }
};

window.BottomNav = BottomNav;
