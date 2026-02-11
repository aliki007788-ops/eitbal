/* ===========================================
   MODULE: TEAM - تیم فانتزی
   نسخه: 2.0.0
   وضعیت: ✅ مستقل - بدون بودجه
=========================================== */

const Team = {
  // ========== PLAYERS DATABASE ==========
  _players: [
    { id: 1, name: 'علیرضا بیرانوند', team: 'تراکتور', position: 'gk', points: 187, price: 0, image: '🧤' },
    { id: 2, name: 'سیدجلال حسینی', team: 'پرسپولیس', position: 'df', points: 145, price: 0, image: '🛡️' },
    { id: 3, name: 'محمدحسین کنعانی', team: 'پرسپولیس', position: 'df', points: 142, price: 0, image: '🛡️' },
    { id: 4, name: 'محمدحسین مرادمند', team: 'استقلال', position: 'df', points: 138, price: 0, image: '🛡️' },
    { id: 5, name: 'علی نعمتی', team: 'پرسپولیس', position: 'df', points: 135, price: 0, image: '🛡️' },
    { id: 6, name: 'مهدی قایدی', team: 'استقلال', position: 'mf', points: 162, price: 0, image: '🎯' },
    { id: 7, name: 'مسعود شجاعی', team: 'تراکتور', position: 'mf', points: 154, price: 0, image: '🎯' },
    { id: 8, name: 'احمد نوراللهی', team: 'پرسپولیس', position: 'mf', points: 148, price: 0, image: '🎯' },
    { id: 9, name: 'امید عالیشاه', team: 'پرسپولیس', position: 'mf', points: 144, price: 0, image: '🎯' },
    { id: 10, name: 'مهدی طارمی', team: 'پرسپولیس', position: 'fw', points: 192, price: 0, image: '⚽' },
    { id: 11, name: 'امیرحسین حسین‌زاده', team: 'تراکتور', position: 'fw', points: 198, price: 0, image: '⚽' },
    { id: 12, name: 'سردار آزمون', team: 'استقلال', position: 'fw', points: 178, price: 0, image: '⚽' },
    { id: 13, name: 'شهریار مغانلو', team: 'سپاهان', position: 'fw', points: 175, price: 0, image: '⚽' },
    { id: 14, name: 'علی علیپور', team: 'پرسپولیس', position: 'fw', points: 185, price: 0, image: '⚽' },
    { id: 15, name: 'محمد محبی', team: 'سپاهان', position: 'mf', points: 152, price: 0, image: '🎯' }
  ],
  
  // ========== TEAM STATE ==========
  _team: [],
  _maxPlayers: 11,
  _positionLimits: {
    gk: 1,
    df: 4,
    mf: 4,
    fw: 2
  },
  
  // ========== INITIALIZE ==========
  init() {
    // Load team from store
    const savedTeam = Royal.get('team') || [];
    this._team = savedTeam;
    
    // Register page
    Router.register('team', () => this.render());
    
    console.log('✅ Team module initialized');
  },
  
  // ========== RENDER ==========
  render() {
    const user = Royal.get('user');
    const teamScore = this._calculateTeamScore();
    const filledCount = this._team.length;
    
    return `
      <div class="royal-card">
        <div class="card-title">
          <span class="card-title-icon">👥</span>
          <span>تیم فانتزی من</span>
        </div>
        
        ${!user.phone ? this._renderAuthWarning() : ''}
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div style="background: var(--gold-20); padding: 12px 20px; border-radius: 50px; display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">⭐</span>
            <span style="font-size: 24px; font-weight: 900; color: var(--gold);">${teamScore}</span>
            <span style="color: var(--text-secondary);">امتیاز</span>
          </div>
          <div style="background: var(--bg-card); padding: 12px 20px; border-radius: 50px;">
            <span style="color: var(--success); font-weight: 900; font-size: 20px;">${filledCount}</span>
            <span style="color: var(--text-secondary);">/${this._maxPlayers}</span>
          </div>
        </div>
        
        ${this._renderFormation()}
        
        ${filledCount === this._maxPlayers ? 
          `<button class="btn" style="width: 100%; margin-top: 24px;" onclick="Team.saveTeam()">
            ✅ ثبت تیم
           </button>` : 
          `<button class="btn btn-outline" style="width: 100%; margin-top: 24px;" onclick="Team.openPlayerSelection()">
            ➕ تکمیل تیم
           </button>`
        }
        
        <p style="color: var(--text-secondary); font-size: 11px; text-align: center; margin-top: 16px;">
          ⚽ تیم خود را بسازید و امتیاز کسب کنید
        </p>
      </div>
    `;
  },
  
  _renderAuthWarning() {
    return `
      <div style="background: var(--warning-20); border: 1px solid var(--warning); border-radius: 16px; padding: 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 24px;">🔐</span>
        <div style="flex: 1;">
          <span style="color: var(--warning); font-weight: 700;">برای ساخت تیم وارد شوید</span>
          <p style="color: var(--text-secondary); font-size: 11px; margin-top: 4px;">تیم شما ذخیره و امتیاز آن محاسبه میشود</p>
        </div>
        <button class="btn btn-sm" onclick="Auth._showAuthModal()" style="padding: 8px 16px; font-size: 12px;">ورود</button>
      </div>
    `;
  },
  
  _renderFormation() {
    const positions = [
      { pos: 'gk', label: 'دروازه‌بان', icon: '🧤' },
      { pos: 'df', label: 'مدافع', icon: '🛡️' },
      { pos: 'df', label: 'مدافع', icon: '🛡️' },
      { pos: 'df', label: 'مدافع', icon: '🛡️' },
      { pos: 'df', label: 'مدافع', icon: '🛡️' },
      { pos: 'mf', label: 'هافبک', icon: '🎯' },
      { pos: 'mf', label: 'هافبک', icon: '🎯' },
      { pos: 'mf', label: 'هافبک', icon: '🎯' },
      { pos: 'mf', label: 'هافبک', icon: '🎯' },
      { pos: 'fw', label: 'مهاجم', icon: '⚽' },
      { pos: 'fw', label: 'مهاجم', icon: '⚽' }
    ];
    
    let html = '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">';
    
    positions.forEach((pos, index) => {
      const player = this._team[index];
      
      html += `
        <div style="
          text-align: center;
          padding: 16px 8px;
          background: ${player ? 'var(--gold-20)' : 'var(--bg-card)'};
          border: 1px solid ${player ? 'var(--gold)' : 'var(--gold-30)'};
          border-radius: 20px;
          cursor: pointer;
          transition: var(--transition-fast);
        " onclick="Team.openPlayerSelection('${pos.pos}', ${index})">
          <div style="font-size: 32px; margin-bottom: 8px;">${player ? this._getPlayerImage(player) : pos.icon}</div>
          <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px;">${player ? player.name : pos.label}</div>
          ${player ? `<div style="font-size: 11px; color: var(--gold);">⭐ ${player.points}</div>` : ''}
        </div>
      `;
    });
    
    html += '</div>';
    return html;
  },
  
  _getPlayerImage(player) {
    const p = this._players.find(p => p.id === player);
    return p ? p.image : '👤';
  },
  
  _getPlayerName(playerId) {
    const p = this._players.find(p => p.id === playerId);
    return p ? p.name : '';
  },
  
  _getPlayerPoints(playerId) {
    const p = this._players.find(p => p.id === playerId);
    return p ? p.points : 0;
  },
  
  _getPlayerTeam(playerId) {
    const p = this._players.find(p => p.id === playerId);
    return p ? p.team : '';
  },
  
  // ========== CALCULATE TEAM SCORE ==========
  _calculateTeamScore() {
    return this._team.reduce((sum, playerId) => {
      const player = this._players.find(p => p.id === playerId);
      return sum + (player ? player.points : 0);
    }, 0);
  },
  
  // ========== OPEN PLAYER SELECTION ==========
  openPlayerSelection(position, slotIndex) {
    if (!Royal.get('user.phone')) {
      Auth._showAuthModal();
      return;
    }
    
    const availablePlayers = this._players.filter(p => {
      // Check position
      if (p.position !== position) return false;
      
      // Check if already selected
      if (this._team.includes(p.id)) return false;
      
      // Check position limit
      const positionCount = this._team.filter(id => {
        const player = this._players.find(pl => pl.id === id);
        return player && player.position === position;
      }).length;
      
      const limit = this._positionLimits[position] || 99;
      if (positionCount >= limit) return false;
      
      return true;
    });
    
    this._showPlayerSelectionModal(availablePlayers, slotIndex);
  },
  
  _showPlayerSelectionModal(players, slotIndex) {
    const modal = document.createElement('div');
    modal.className = 'royal-modal active';
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 450px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="color: var(--gold);">انتخاب بازیکن</h3>
          <button class="btn-close" onclick="this.closest('.royal-modal').remove()" style="background: none; border: none; color: var(--text-secondary); font-size: 24px;">&times;</button>
        </div>
        
        ${players.length === 0 ? 
          `<div style="text-align: center; padding: 40px;">
             <span style="font-size: 48px;">😕</span>
             <p style="color: var(--text-secondary); margin-top: 16px;">بازیکنی برای انتخاب وجود ندارد</p>
           </div>` :
          `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; max-height: 400px; overflow-y: auto;">
             ${players.map(player => `
               <div style="
                 background: var(--bg-card);
                 border: 1px solid var(--gold-30);
                 border-radius: 16px;
                 padding: 16px;
                 text-align: center;
                 cursor: pointer;
                 transition: var(--transition-fast);
               " onclick="Team.selectPlayer(${player.id}, ${slotIndex})">
                 <div style="font-size: 40px; margin-bottom: 8px;">${player.image}</div>
                 <div style="font-weight: 700; margin-bottom: 4px;">${player.name}</div>
                 <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">${player.team}</div>
                 <div style="color: var(--gold); font-weight: 700;">⭐ ${player.points}</div>
               </div>
             `).join('')}
           </div>`
        }
      </div>
    `;
    
    document.body.appendChild(modal);
  },
  
  // ========== SELECT PLAYER ==========
  selectPlayer(playerId, slotIndex) {
    // Update team
    const newTeam = [...this._team];
    newTeam[slotIndex] = playerId;
    this._team = newTeam;
    
    // Save to store
    Royal.set('team', this._team);
    
    // Close modal
    document.querySelector('.royal-modal')?.remove();
    
    // Refresh page
    Router.refresh();
    
    Toast.show('✅ بازیکن اضافه شد', 'success');
  },
  
  // ========== REMOVE PLAYER ==========
  removePlayer(slotIndex) {
    const newTeam = [...this._team];
    newTeam[slotIndex] = null;
    this._team = newTeam.filter(p => p !== null);
    
    Royal.set('team', this._team);
    Router.refresh();
    
    Toast.show('✅ بازیکن حذف شد', 'success');
  },
  
  // ========== SAVE TEAM ==========
  saveTeam() {
    if (this._team.length !== this._maxPlayers) {
      Toast.show('❌ تیم شما کامل نیست', 'error');
      return false;
    }
    
    // Check authentication
    if (!Royal.get('user.phone')) {
      Auth._showAuthModal();
      return false;
    }
    
    // Save to store
    Royal.set('team', this._team);
    
    // Add points
    const teamScore = this._calculateTeamScore();
    Royal.update('stats.points', p => p + teamScore);
    
    Toast.show('✅ تیم شما ثبت شد', 'success');
    Royal.haptic('success');
    
    Router.goTo('home');
    
    return true;
  }
};

window.Team = Team;