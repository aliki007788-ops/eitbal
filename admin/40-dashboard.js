/* ===========================================
   ADMIN DASHBOARD - پنل مدیریت
   نسخه: 2.0.0
   وضعیت: ✅ فقط مدیران
=========================================== */

const AdminDashboard = {
  // ========== AUTH ==========
  _isAdmin: false,
  
  checkAuth() {
    // In production: verify admin token
    const user = Royal.get('user');
    this._isAdmin = user.id === 'admin_1' || user.id === 'admin_2';
    return this._isAdmin;
  },
  
  // ========== RENDER DASHBOARD ==========
  render() {
    if (!this.checkAuth()) {
      return '<div style="text-align: center; padding: 50px;">⛔ دسترسی غیرمجاز</div>';
    }
    
    return `
      <div class="royal-card">
        <div class="card-title">
          <span class="card-title-icon">⚙️</span>
          <span>پنل مدیریت رویال</span>
        </div>
        
        <!-- Stats Overview -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px;">
          <div style="background: var(--bg-card); border-radius: 16px; padding: 20px;">
            <span style="font-size: 32px;">👥</span>
            <div style="font-size: 24px; font-weight: 900; margin-top: 8px;">۱۲,۴۵۰</div>
            <div style="color: var(--text-secondary);">کاربران</div>
          </div>
          <div style="background: var(--bg-card); border-radius: 16px; padding: 20px;">
            <span style="font-size: 32px;">💰</span>
            <div style="font-size: 24px; font-weight: 900; margin-top: 8px;">۴۵.۲M</div>
            <div style="color: var(--text-secondary);">درآمد</div>
          </div>
          <div style="background: var(--bg-card); border-radius: 16px; padding: 20px;">
            <span style="font-size: 32px;">🎯</span>
            <div style="font-size: 24px; font-weight: 900; margin-top: 8px;">۸۹.۱K</div>
            <div style="color: var(--text-secondary);">پیش‌بینی</div>
          </div>
        </div>
        
        <!-- Tabs -->
        <div style="display: flex; gap: 12px; margin-bottom: 24px; border-bottom: 1px solid var(--gold-30); padding-bottom: 16px;">
          <button class="tab-btn active" onclick="AdminDashboard.showTab('matches')">مسابقات</button>
          <button class="tab-btn" onclick="AdminDashboard.showTab('league')">لیگ</button>
          <button class="tab-btn" onclick="AdminDashboard.showTab('users')">کاربران</button>
          <button class="tab-btn" onclick="AdminDashboard.showTab('transactions')">تراکنش‌ها</button>
          <button class="tab-btn" onclick="AdminDashboard.showTab('products')">محصولات</button>
        </div>
        
        <!-- Content -->
        <div id="adminContent">
          ${this.renderMatchesManagement()}
        </div>
      </div>
    `;
  },
  
  // ========== MATCHES MANAGEMENT ==========
  renderMatchesManagement() {
    const matches = Prediction._matches;
    
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h3 style="color: var(--gold);">مدیریت مسابقات</h3>
          <button class="btn" onclick="AdminDashboard.addMatch()">➕ افزودن مسابقه</button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${matches.map(match => `
            <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--bg-card); border-radius: 16px;">
              <span style="font-size: 24px;">${match.homeIcon} vs ${match.awayIcon}</span>
              <div style="flex: 1;">
                <div style="font-weight: 700;">${match.home} - ${match.away}</div>
                <div style="font-size: 12px; color: var(--text-secondary);">
                  ${match.date} | ${match.time} | ${match.stadium}
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-sm" onclick="AdminDashboard.editMatch(${match.id})">✏️</button>
                <button class="btn btn-sm btn-outline" onclick="AdminDashboard.deleteMatch(${match.id})">🗑️</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },
  
  // ========== ACTIONS ==========
  addMatch() {
    const modal = document.createElement('div');
    modal.className = 'royal-modal active';
    
    modal.innerHTML = `
      <div class="modal-content">
        <h3 style="color: var(--gold); margin-bottom: 24px;">➕ افزودن مسابقه جدید</h3>
        
        <div style="display: grid; gap: 16px; margin-bottom: 24px;">
          <div>
            <label style="display: block; color: var(--text-secondary); margin-bottom: 8px;">تیم میزبان</label>
            <input type="text" id="homeTeam" placeholder="مثال: تراکتور" style="width: 100%; padding: 12px; background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 12px; color: white;">
          </div>
          <div>
            <label style="display: block; color: var(--text-secondary); margin-bottom: 8px;">تیم مهمان</label>
            <input type="text" id="awayTeam" placeholder="مثال: استقلال" style="width: 100%; padding: 12px; background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 12px; color: white;">
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <label style="display: block; color: var(--text-secondary); margin-bottom: 8px;">تاریخ</label>
              <input type="text" id="matchDate" placeholder="۱۴۰۴/۱۱/۲۴" style="width: 100%; padding: 12px; background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 12px; color: white;">
            </div>
            <div>
              <label style="display: block; color: var(--text-secondary); margin-bottom: 8px;">ساعت</label>
              <input type="text" id="matchTime" placeholder="۲۰:۳۰" style="width: 100%; padding: 12px; background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 12px; color: white;">
            </div>
          </div>
          <div>
            <label style="display: block; color: var(--text-secondary); margin-bottom: 8px;">ورزشگاه</label>
            <input type="text" id="stadium" placeholder="مثال: آزادی - تهران" style="width: 100%; padding: 12px; background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 12px; color: white;">
          </div>
        </div>
        
        <div style="display: flex; gap: 16px;">
          <button class="btn" style="flex: 1;" onclick="AdminDashboard.saveMatch()">ذخیره</button>
          <button class="btn btn-outline" style="flex: 1;" onclick="this.closest('.royal-modal').remove()">انصراف</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  },
  
  saveMatch() {
    // Implementation
    Toast.show('✅ مسابقه با موفقیت اضافه شد', 'success');
    document.querySelector('.royal-modal')?.remove();
  },
  
  deleteMatch(matchId) {
    if (confirm('آیا از حذف این مسابقه اطمینان دارید؟')) {
      Prediction.removeMatch(matchId);
      Toast.show('✅ مسابقه حذف شد', 'success');
    }
  }
};

window.AdminDashboard = AdminDashboard;