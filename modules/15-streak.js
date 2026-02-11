/* ===========================================
   MODULE: STREAK - حضور پیوسته
   نسخه: 2.0.0
   وضعیت: ✅ مستقل
=========================================== */

const Streak = {
  // ========== INITIALIZE ==========
  init() {
    console.log('✅ Streak module initialized');
  },
  
  // ========== SHOW MODAL ==========
  showModal() {
    const stats = Royal.get('stats');
    const user = Royal.get('user');
    
    const joinDate = user.joinDate ? new Date(user.joinDate) : new Date();
    const daysInApp = Math.floor((Date.now() - joinDate) / (1000 * 60 * 60 * 24));
    
    const modal = document.createElement('div');
    modal.className = 'royal-modal active';
    modal.innerHTML = `
      <div class="modal-content">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 64px;">🔥</span>
          <h2 style="margin-top: 16px; color: var(--gold);">حضور پیوسته</h2>
        </div>
        
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 48px; font-weight: 900; color: var(--gold);">${stats.streak}</span>
          <span style="display: block; color: var(--text-secondary); margin-top: 8px;">روز متوالی</span>
        </div>
        
        <div style="background: var(--bg-card); border-radius: 20px; padding: 20px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="color: var(--text-secondary);">عضو از</span>
            <span style="color: var(--gold);">${Utils.getPersianDate(joinDate)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">سن حضور</span>
            <span style="color: var(--gold);">${daysInApp} روز</span>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-bottom: 24px;">
          ${this._renderWeekCalendar()}
        </div>
        
        <div style="background: linear-gradient(135deg, var(--gold-20), var(--bg-card)); border-radius: 20px; padding: 20px; text-align: center;">
          <span style="font-size: 24px;">🎁</span>
          <div style="color: var(--gold); font-weight: 700; margin-top: 8px;">جایزه فردا</div>
          <div style="font-size: 28px; font-weight: 900; color: var(--gold); margin-top: 8px;">+${50 + (stats.streak * 20)}</div>
          <div style="color: var(--text-secondary); font-size: 12px; margin-top: 4px;">سکه</div>
        </div>
        
        <button class="btn" style="width: 100%; margin-top: 24px;" onclick="this.closest('.royal-modal').remove()">
          بستن
        </button>
        
        <button class="btn-close" onclick="this.closest('.royal-modal').remove()" 
                style="position: absolute; top: 16px; left: 16px; background: none; border: none; color: var(--text-secondary); font-size: 24px; cursor: pointer;">
          &times;
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
  },
  
  _renderWeekCalendar() {
    const days = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    const today = new Date().getDay();
    const stats = Royal.get('stats');
    
    return days.map((day, i) => {
      const isToday = i === today;
      const isPast = i < today;
      const wasPresent = isPast && (stats.streak > (today - i));
      
      return `
        <div style="
          aspect-ratio: 1;
          background: ${isToday ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))' : wasPresent ? 'var(--gold-20)' : 'var(--bg-card)'};
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: ${isToday ? '2px solid var(--gold)' : 'none'};
        ">
          <span style="font-size: 20px;">${isToday ? '🔥' : wasPresent ? '✓' : '○'}</span>
          <span style="font-size: 11px; color: ${isToday ? 'black' : 'var(--text-secondary)'};">${day}</span>
        </div>
      `;
    }).join('');
  }
};

window.Streak = Streak;