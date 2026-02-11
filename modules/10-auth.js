/* ===========================================
   MODULE: AUTH - احراز هویت
   نسخه: 2.0.0
   وضعیت: ✅ مستقل
=========================================== */

const Auth = {
  // ========== INITIALIZE ==========
  async init() {
    // Check if user is already authenticated
    const user = Royal.get('user');
    
    if (!user.phone) {
      this._showAuthModal();
    }
    
    Events.on('auth:login', async (data) => {
      await this.login(data.phone, data.gender);
    });
    
    console.log('✅ Auth module initialized');
  },
  
  // ========== LOGIN ==========
  async login(phone, gender) {
    if (!Utils.isValidPhone(phone)) {
      Toast.show('❌ شماره موبایل نامعتبر است', 'error');
      return false;
    }
    
    if (!gender) {
      Toast.show('❌ لطفاً جنسیت خود را انتخاب کنید', 'error');
      return false;
    }
    
    // Send verification code via Eitaa
    try {
      const response = await HTTP.post('/auth/send-code', { phone });
      
      if (response.success) {
        this._showCodeModal(phone, gender);
      } else {
        Toast.show('❌ خطا در ارسال کد', 'error');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      Toast.show('❌ خطا در ارتباط با سرور', 'error');
    }
  },
  
  // ========== VERIFY CODE ==========
  async verifyCode(phone, code, gender) {
    try {
      const response = await HTTP.post('/auth/verify', { phone, code });
      
      if (response.success) {
        // Update user data
        Royal.set('user.phone', phone);
        Royal.set('user.gender', gender);
        Royal.set('user.name', response.name || 'کاربر');
        Royal.set('user.id', response.userId);
        Royal.set('user.joinDate', new Date().toISOString());
        
        // Save gender
        localStorage.setItem('eitabal_gender', gender);
        
        Toast.show('✅ خوش آمدید!', 'success');
        
        // Close modal
        document.querySelector('.royal-modal')?.classList.remove('active');
        
        // Refresh page
        Router.refresh();
        
        return true;
      } else {
        Toast.show('❌ کد تأیید نامعتبر است', 'error');
        return false;
      }
    } catch (error) {
      console.error('❌ Verify error:', error);
      Toast.show('❌ خطا در تأیید کد', 'error');
      return false;
    }
  },
  
  // ========== LOGOUT ==========
  logout() {
    Royal.set('user.phone', null);
    Royal.set('user.gender', null);
    Royal.set('user.name', null);
    Royal.set('user.id', null);
    Royal.set('stats', {
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
    });
    
    localStorage.removeItem('eitabal_gender');
    localStorage.removeItem('royal_store');
    
    Toast.show('👋 خداحافظ!', 'info');
    
    this._showAuthModal();
    Router.goTo('home');
  },
  
  // ========== MODALS ==========
  _showAuthModal() {
    const modal = document.createElement('div');
    modal.className = 'royal-modal active';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 360px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 64px;">👑</span>
          <h2 style="margin-top: 16px; color: var(--gold);">ورود به ایتبال</h2>
          <p style="color: var(--text-secondary); font-size: 13px; margin-top: 8px;">
            برای استفاده از چت و رأی‌گیری، وارد شوید
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; color: var(--text-secondary); font-size: 12px; margin-bottom: 8px;">
            شماره موبایل
          </label>
          <input type="tel" id="loginPhone" placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                 style="width: 100%; padding: 16px; background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 16px; color: white; font-size: 16px; text-align: center;"
                 maxlength="11">
        </div>
        
        <div style="margin-bottom: 24px;">
          <label style="display: block; color: var(--text-secondary); font-size: 12px; margin-bottom: 8px;">
            جنسیت
          </label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <button class="btn btn-outline gender-btn" data-gender="female" style="padding: 14px;">
              <span style="font-size: 24px; display: block; margin-bottom: 4px;">👩</span>
              خانم
            </button>
            <button class="btn btn-outline gender-btn" data-gender="male" style="padding: 14px;">
              <span style="font-size: 24px; display: block; margin-bottom: 4px;">👨</span>
              آقا
            </button>
          </div>
        </div>
        
        <button class="btn" id="loginSubmitBtn" style="width: 100%; padding: 16px; font-size: 16px;" onclick="Auth._submitLogin()">
          دریافت کد تأیید
        </button>
        
        <p style="color: var(--text-secondary); font-size: 11px; text-align: center; margin-top: 20px;">
          با ورود، شرایط استفاده و حریم خصوصی را می‌پذیرید.
        </p>
        
        <button class="btn-close" onclick="this.closest('.royal-modal').remove()" 
                style="position: absolute; top: 16px; left: 16px; background: none; border: none; color: var(--text-secondary); font-size: 24px; cursor: pointer;">
          &times;
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add gender selection handlers
    modal.querySelectorAll('.gender-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        modal.querySelectorAll('.gender-btn').forEach(b => {
          b.classList.remove('active');
          b.style.background = 'transparent';
          b.style.color = 'var(--gold)';
        });
        this.classList.add('active');
        this.style.background = 'var(--gold-20)';
        this.style.color = 'var(--gold)';
      });
    });
  },
  
  _showCodeModal(phone, gender) {
    document.querySelector('.royal-modal')?.remove();
    
    const modal = document.createElement('div');
    modal.className = 'royal-modal active';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 360px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 64px;">📱</span>
          <h2 style="margin-top: 16px; color: var(--gold);">کد تأیید</h2>
          <p style="color: var(--text-secondary); font-size: 13px; margin-top: 8px;">
            کد ۴ رقمی ارسال شده به ${phone} را وارد کنید
          </p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <input type="text" id="verifyCode" placeholder="۱۲۳۴" 
                 style="width: 100%; padding: 16px; background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 16px; color: white; font-size: 24px; text-align: center; letter-spacing: 8px;"
                 maxlength="4" inputmode="numeric">
        </div>
        
        <button class="btn" id="verifySubmitBtn" style="width: 100%; padding: 16px; font-size: 16px;" 
                onclick="Auth.verifyCode('${phone}', document.getElementById('verifyCode').value, '${gender}')">
          تأیید و ورود
        </button>
        
        <p style="color: var(--text-secondary); font-size: 12px; text-align: center; margin-top: 20px;">
          کد را دریافت نکردید؟ 
          <a href="#" onclick="Auth._showAuthModal(); return false;" style="color: var(--gold);">ارسال مجدد</a>
        </p>
        
        <button class="btn-close" onclick="this.closest('.royal-modal').remove()" 
                style="position: absolute; top: 16px; left: 16px; background: none; border: none; color: var(--text-secondary); font-size: 24px; cursor: pointer;">
          &times;
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.getElementById('verifyCode')?.focus();
  },
  
  _submitLogin() {
    const phone = document.getElementById('loginPhone')?.value;
    const activeGender = document.querySelector('.gender-btn.active');
    
    if (!phone) {
      Toast.show('❌ شماره موبایل را وارد کنید', 'error');
      return;
    }
    
    if (!activeGender) {
      Toast.show('❌ جنسیت خود را انتخاب کنید', 'error');
      return;
    }
    
    const gender = activeGender.dataset.gender;
    this.login(phone, gender);
  }
};

window.Auth = Auth;