/* ===========================================
   MODULE: EXTRA MENU - منوی اضافی ۶ تایی
   نسخه: 2.0.0
   وضعیت: ✅ مستقل
=========================================== */

const ExtraMenu = {
  // ========== INITIALIZE ==========
  init() {
    this.render();
    console.log('✅ ExtraMenu module initialized');
  },
  
  // ========== RENDER ==========
  render() {
    if (document.querySelector('.royal-extra-menu')) return;
    
    const menu = document.createElement('div');
    menu.className = 'royal-extra-menu';
    menu.id = 'extraMenu';
    menu.innerHTML = this._getHTML();
    document.body.appendChild(menu);
  },
  
  // ========== GET HTML ==========
  _getHTML() {
    return `
      <div class="royal-extra-item" onclick="Router.goTo('predict'); ExtraMenu.close()">
        <span class="extra-icon">🎯</span>
        <span class="extra-label">پیش‌بینی</span>
      </div>
      <div class="royal-extra-item" onclick="Router.goTo('team'); ExtraMenu.close()">
        <span class="extra-icon">👥</span>
        <span class="extra-label">تیم من</span>
      </div>
      <div class="royal-extra-item" onclick="Router.goTo('vote'); ExtraMenu.close()">
        <span class="extra-icon">⭐</span>
        <span class="extra-label">رأی‌گیری</span>
      </div>
      <div class="royal-extra-item" onclick="Router.goTo('tap'); ExtraMenu.close()">
        <span class="extra-icon">👆</span>
        <span class="extra-label">تپ</span>
      </div>
      <div class="royal-extra-item" onclick="Router.goTo('shop'); ExtraMenu.close()">
        <span class="extra-icon">🛒</span>
        <span class="extra-label">فروشگاه</span>
      </div>
      <div class="royal-extra-item" onclick="Router.goTo('chat'); ExtraMenu.close()">
        <span class="extra-icon">💬</span>
        <span class="extra-label">چت</span>
      </div>
    `;
  },
  
  // ========== TOGGLE ==========
  toggle() {
    const menu = document.getElementById('extraMenu');
    menu.classList.toggle('active');
    
    const crown = document.querySelector('.crown-button');
    if (menu.classList.contains('active')) {
      crown.style.transform = 'scale(1.2) rotate(180deg)';
    } else {
      crown.style.transform = 'scale(1) rotate(0)';
    }
  },
  
  close() {
    document.getElementById('extraMenu')?.classList.remove('active');
    document.querySelector('.crown-button').style.transform = 'scale(1) rotate(0)';
  }
};

window.ExtraMenu = ExtraMenu;