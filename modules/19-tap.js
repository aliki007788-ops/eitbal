/* ===========================================
   MODULE: TAP - بازی تپ سرگرمی
   نسخه: 2.0.0
   وضعیت: ✅ مستقل - کاملاً حلال (بدون جایزه)
=========================================== */

const Tap = {
  // ========== STATE ==========
  _energy: 1000,
  _maxEnergy: 1000,
  _tapCount: 0,
  _todayTap: 0,
  _isEnabled: true,
  _lastTapTime: null,
  _tapPower: 1,
  
  // ========== INITIALIZE ==========
  init() {
    // Load from store
    const stats = Royal.get('stats');
    this._energy = stats.energy || 1000;
    this._maxEnergy = stats.maxEnergy || 1000;
    this._tapCount = stats.tapCount || 0;
    this._todayTap = stats.todayTap || 0;
    
    // Check premium
    if (Royal.isPremium()) {
      this._tapPower = 1.5;
    }
    
    // Register page
    Router.register('tap', () => this.render());
    
    // Start energy refill
    this._startRefill();
    
    console.log('✅ Tap module initialized');
  },
  
  // ========== RENDER ==========
  render() {
    return `
      <div class="royal-card" style="text-align: center;">
        <div class="card-title">
          <span class="card-title-icon">👆</span>
          <span>تپ سرگرمی</span>
          ${Royal.isPremium() ? '<span style="background: var(--gold); color: black; padding: 4px 12px; border-radius: 30px; font-size: 11px;">بوستر ۱.۵×</span>' : ''}
        </div>
        
        <div style="margin: 40px 0; position: relative;">
          <div style="position: relative; display: inline-block;">
            <div id="tapButton" 
                 style="width: 200px; height: 200px; border-radius: 50%; 
                        background: radial-gradient(circle at 30% 30%, var(--gold), var(--gold-dark));
                        display: flex; align-items: center; justify-content: center;
                        font-size: 80px; cursor: pointer; margin: 0 auto;
                        box-shadow: 0 0 50px var(--gold-50);
                        transition: transform 0.1s ease;
                        ${!this._isEnabled ? 'opacity: 0.5; filter: grayscale(1);' : ''}"
                 onclick="Tap.handleTap(this)">
              ⚽
            </div>
            <div style="position: absolute; top: -20px; right: -20px; font-size: 40px; animation: spin 10s linear infinite;">
              👑
            </div>
          </div>
        </div>
        
        <div style="background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 30px; padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 28px;">⚡</span>
              <span style="font-weight: 700;">انرژی</span>
            </div>
            <span style="font-size: 24px; font-weight: 900; color: var(--gold);" id="energyDisplay">
              ${this._energy}/${this._maxEnergy}
            </span>
          </div>
          
          <div style="width: 100%; height: 12px; background: var(--bg-card); border-radius: 6px; margin-bottom: 24px; overflow: hidden; border: 1px solid var(--gold-30);">
            <div id="energyBar" 
                 style="width: ${(this._energy / this._maxEnergy) * 100}%; height: 100%; 
                        background: linear-gradient(90deg, var(--gold), var(--gold-dark));
                        border-radius: 6px; transition: width 0.3s ease;">
            </div>
          </div>
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <span style="font-size: 32px;">👆</span>
              <div style="text-align: right;">
                <div style="font-weight: 700; color: var(--gold);">قدرت تپ</div>
                <div style="font-size: 12px; color: var(--text-secondary);">هر تپ ${this._tapPower} سکه</div>
              </div>
            </div>
            
            <div class="crystal-switch ${this._isEnabled ? 'active' : ''}" 
                 id="tapSwitch"
                 onclick="Tap.toggle()"
                 style="width: 70px; height: 34px; background: ${this._isEnabled ? 'var(--gold-20)' : 'var(--bg-card)'}; border-radius: 34px; position: relative; cursor: pointer; border: 1px solid var(--gold-30);">
              <div style="width: 30px; height: 30px; background: var(--gold); border-radius: 50%; position: absolute; top: 1px; ${this._isEnabled ? 'right: 36px;' : 'right: 2px;'}; transition: 0.3s; display: flex; align-items: center; justify-content: center; font-size: 16px; color: black;">
                👑
              </div>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px; padding-top: 20px; border-top: 1px solid var(--gold-30);">
            <div style="text-align: center;">
              <span style="font-size: 14px; color: var(--text-secondary);">کل تپ</span>
              <div style="font-size: 24px; font-weight: 900; color: var(--gold); margin-top: 4px;" id="totalTaps">
                ${Utils.formatNumber(this._tapCount)}
              </div>
            </div>
            <div style="text-align: center;">
              <span style="font-size: 14px; color: var(--text-secondary);">تپ امروز</span>
              <div style="font-size: 24px; font-weight: 900; color: var(--success); margin-top: 4px;" id="todayTaps">
                ${Utils.formatNumber(this._todayTap)}
              </div>
            </div>
            <div style="text-align: center;">
              <span style="font-size: 14px; color: var(--text-secondary);">سکه</span>
              <div style="font-size: 24px; font-weight: 900; color: var(--gold); margin-top: 4px;" id="coinDisplay">
                ${Utils.formatNumber(Royal.get('stats.coins'))}
              </div>
            </div>
          </div>
        </div>
        
        <p style="color: var(--text-secondary); font-size: 11px; text-align: center; margin-top: 20px;">
          ⚠️ تپ فقط برای سرگرمی است و هیچ جایزه نقدی ندارد
        </p>
      </div>
    `;
  },
  
  // ========== HANDLE TAP ==========
  handleTap(element) {
    if (!this._isEnabled) {
      Toast.show('⛔ تپ غیرفعال است', 'error');
      return;
    }
    
    if (this._energy < 5) {
      Toast.show('⚡ انرژی تمام شد!', 'error');
      return;
    }
    
    // Deduct energy
    this._energy -= 5;
    this._updateEnergyUI();
    
    // Add tap count
    this._tapCount++;
    this._todayTap++;
    
    // Add coins (with premium bonus)
    const coinsToAdd = Math.floor(this._tapPower);
    Royal.update('stats.coins', c => c + coinsToAdd);
    Royal.update('stats.tapCount', c => c + 1);
    Royal.update('stats.todayTap', t => t + 1);
    Royal.set('stats.energy', this._energy);
    
    // Update UI
    document.getElementById('totalTaps').textContent = Utils.formatNumber(this._tapCount);
    document.getElementById('todayTaps').textContent = Utils.formatNumber(this._todayTap);
    document.getElementById('coinDisplay').textContent = Utils.formatNumber(Royal.get('stats.coins'));
    
    // Animation
    gsap.to(element, {
      scale: 0.85,
      rotation: 15,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    });
    
    // Particle effect
    this._createTapEffect();
    
    // Haptic feedback
    Royal.haptic('light');
  },
  
  // ========== TOGGLE TAP ==========
  toggle() {
    this._isEnabled = !this._isEnabled;
    
    const button = document.getElementById('tapButton');
    const switchEl = document.getElementById('tapSwitch');
    const slider = switchEl.querySelector('div');
    
    if (this._isEnabled) {
      button.style.opacity = '1';
      button.style.filter = 'none';
      switchEl.style.background = 'var(--gold-20)';
      slider.style.right = '36px';
      Toast.show('✅ تپ فعال شد', 'success');
    } else {
      button.style.opacity = '0.5';
      button.style.filter = 'grayscale(1)';
      switchEl.style.background = 'var(--bg-card)';
      slider.style.right = '2px';
      Toast.show('⛔ تپ غیرفعال شد', 'info');
    }
  },
  
  // ========== ENERGY REFILL ==========
  _startRefill() {
    setInterval(() => {
      if (this._energy < this._maxEnergy) {
        this._energy = Math.min(this._maxEnergy, this._energy + 15);
        this._updateEnergyUI();
        Royal.set('stats.energy', this._energy);
      }
    }, 30000); // Every 30 seconds
  },
  
  _updateEnergyUI() {
    const energyBar = document.getElementById('energyBar');
    const energyDisplay = document.getElementById('energyDisplay');
    
    if (energyBar) {
      energyBar.style.width = `${(this._energy / this._maxEnergy) * 100}%`;
    }
    
    if (energyDisplay) {
      energyDisplay.textContent = `${this._energy}/${this._maxEnergy}`;
    }
  },
  
  // ========== TAP EFFECT ==========
  _createTapEffect() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const effect = document.createElement('div');
        effect.textContent = i === 0 ? `+${this._tapPower} 👑` : '✨';
        effect.style.cssText = `
          position: fixed;
          left: ${50 + (Math.random() * 40 - 20)}%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: var(--gold);
          font-size: ${30 + Math.random() * 30}px;
          font-weight: 900;
          pointer-events: none;
          animation: tapFloat ${1 + Math.random() * 0.5}s ease-out forwards;
          z-index: 9999;
          text-shadow: 0 0 20px var(--gold);
        `;
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 1500);
      }, i * 50);
    }
  },
  
  // ========== RESET DAILY ==========
  resetDaily() {
    this._todayTap = 0;
    Royal.set('stats.todayTap', 0);
  }
};

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes tapFloat {
    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
    100% { transform: translate(-50%, -200%) scale(1.5); opacity: 0; }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

window.Tap = Tap;