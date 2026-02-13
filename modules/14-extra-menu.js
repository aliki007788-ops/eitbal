/* ===========================================
   MODULE: EXTRA MENU - منوی اضافی ۶ تایی
   نسخه: 2.1.0
   تغییرات:
   - رفع مشکل جایگذاری ماژول‌ها بعد از افکت
   - انیمیشن چرخش برای هر آیتم مجزا
   - تثبیت موقعیت نهایی بعد از انیمیشن
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
        <div class="royal-extra-icon">🎯</div>
        <span class="royal-extra-label">پیش‌بینی</span>
      </div>
      <div class="royal-extra-item" onclick="Router.goTo('team'); ExtraMenu.close()">
        <div class="royal-extra-icon">👥</div>
        <span class="royal-extra-label">تیم رویال</span>
      </div>
      <div class="royal-extra-item" onclick="Router.goTo('vote'); ExtraMenu.close()">
        <div class="royal-extra-icon">⭐</div>
        <span class="royal-extra-label">رأی‌گیری</span>
      </div>
      <div class="royal-extra-item" onclick="Router.goTo('tap'); ExtraMenu.close()">
        <div class="royal-extra-icon">👆</div>
        <span class="royal-extra-label">تپ رویال</span>
      </div>
      <div class="royal-extra-item" onclick="Router.goTo('shop'); ExtraMenu.close()">
        <div class="royal-extra-icon">🛒</div>
        <span class="royal-extra-label">فروشگاه</span>
      </div>
      <div class="royal-extra-item" onclick="Router.goTo('chat'); ExtraMenu.close()">
        <div class="royal-extra-icon">💬</div>
        <span class="royal-extra-label">چت رویال</span>
      </div>
    `;
  },
  
  // ========== TOGGLE ==========
  toggle() {
    const menu = document.getElementById('extraMenu');
    
    if (menu.classList.contains('active')) {
      this.close();
    } else {
      this.open();
    }
  },
  
  // ========== OPEN ==========
  open() {
    const menu = document.getElementById('extraMenu');
    menu.classList.add('active');
    
    // انیمیشن چرخش مجزا برای هر آیتم
    const items = document.querySelectorAll('.royal-extra-item');
    items.forEach((item, index) => {
      // تنظیم استایل اولیه
      item.style.opacity = '0';
      item.style.transform = 'scale(0) rotate(-180deg)';
      
      // انیمیشن با تاخیر متفاوت برای هر آیتم
      setTimeout(() => {
        item.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        item.style.opacity = '1';
        item.style.transform = 'scale(1) rotate(0deg)';
      }, 50 * index); // تاخیر ۵۰ میلی‌ثانیه برای هر آیتم
    });
    
    // انیمیشن دکمه تاجدار (فقط حرکت به طرفین)
    const crownBtn = document.querySelector('.royal-crown-button-fixed');
    crownBtn.style.transition = 'transform 0.3s ease';
    crownBtn.style.transform = 'scale(0.95)';
  },
  
  // ========== CLOSE ==========
  close() {
    const menu = document.getElementById('extraMenu');
    menu.classList.remove('active');
    
    // ریست کردن انیمیشن‌ها
    const items = document.querySelectorAll('.royal-extra-item');
    items.forEach(item => {
      item.style.transition = '';
      item.style.opacity = '';
      item.style.transform = '';
    });
    
    // ریست دکمه تاجدار
    const crownBtn = document.querySelector('.royal-crown-button-fixed');
    crownBtn.style.transition = 'transform 0.3s ease';
    crownBtn.style.transform = 'scale(1)';
  }
};

window.ExtraMenu = ExtraMenu;
