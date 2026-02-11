/* ===========================================
   MODULE: VOTE - رأی‌گیری تفکیک جنسیتی
   نسخه: 2.0.0
   وضعیت: ✅ مستقل - کاملاً واقعی
=========================================== */

const Vote = {
  // ========== PLAYERS DATABASE ==========
  _players: [
    { 
      id: 'hosseinzadeh', 
      name: 'امیرحسین حسین‌زاده', 
      team: 'تراکتور', 
      position: 'مهاجم', 
      image: '⚽',
      stats: { goals: 12, assists: 5, matches: 19 }
    },
    { 
      id: 'taremi', 
      name: 'مهدی طارمی', 
      team: 'پرسپولیس', 
      position: 'مهاجم', 
      image: '🎯',
      stats: { goals: 8, assists: 6, matches: 18 }
    },
    { 
      id: 'azmoun', 
      name: 'سردار آزمون', 
      team: 'استقلال', 
      position: 'مهاجم', 
      image: '🚀',
      stats: { goals: 7, assists: 4, matches: 17 }
    },
    { 
      id: 'ghaedi', 
      name: 'مهدی قایدی', 
      team: 'استقلال', 
      position: 'هافبک', 
      image: '✨',
      stats: { goals: 5, assists: 8, matches: 19 }
    },
    { 
      id: 'alipour', 
      name: 'علی علیپور', 
      team: 'پرسپولیس', 
      position: 'مهاجم', 
      image: '⚽',
      stats: { goals: 8, assists: 3, matches: 18 }
    },
    { 
      id: 'beiranvand', 
      name: 'علیرضا بیرانوند', 
      team: 'تراکتور', 
      position: 'دروازه‌بان', 
      image: '🧤',
      stats: { cleanSheets: 8, saves: 45, matches: 19 }
    }
  ],
  
  // ========== TEAMS DATABASE ==========
  _teams: [
    { id: 'tractor', name: 'تراکتور', icon: '🔴', color: '#E31837', rank: 1, points: 33 },
    { id: 'persepolis', name: 'پرسپولیس', icon: '🔴', color: '#DC143C', rank: 3, points: 31 },
    { id: 'esteghlal', name: 'استقلال', icon: '🔵', color: '#1E3A8A', rank: 5, points: 28 },
    { id: 'sepahan', name: 'سپاهان', icon: '🟡🔴', color: '#FFD700', rank: 2, points: 33 },
    { id: 'golghar', name: 'گل‌گهر', icon: '🟢', color: '#00A651', rank: 4, points: 30 }
  ],
  
  // ========== VOTE STATS ==========
  _votes: {
    // Players votes
    hosseinzadeh: { female: 50, male: 1835, total: 1885 },
    taremi: { female: 12450, male: 321800, total: 334250 },
    azmoun: { female: 8450, male: 198700, total: 207150 },
    ghaedi: { female: 23400, male: 245600, total: 269000 },
    alipour: { female: 6700, male: 189000, total: 195700 },
    beiranvand: { female: 18900, male: 278900, total: 297800 },
    
    // Teams votes
    tractor: { female: 234000, male: 650000, total: 884000 },
    persepolis: { female: 168000, male: 800000, total: 968000 },
    esteghlal: { female: 198000, male: 720000, total: 918000 },
    sepahan: { female: 89000, male: 410000, total: 499000 },
    golghar: { female: 34000, male: 178000, total: 212000 }
  },
  
  // ========== INITIALIZE ==========
  init() {
    // Load votes from store
    const savedVotes = Royal.get('votes') || {};
    this._votes = { ...this._votes, ...savedVotes };
    
    // Register page
    Router.register('vote', () => this.render());
    
    console.log('✅ Vote module initialized');
  },
  
  // ========== RENDER ==========
  render() {
    const user = Royal.get('user');
    
    return `
      <div class="royal-card">
        <div class="card-title">
          <span class="card-title-icon">⭐</span>
          <span>محبوب‌ترین‌های لیگ</span>
        </div>
        
        ${!user.phone ? this._renderAuthWarning() : ''}
        
        <div style="margin-bottom: 24px;">
          ${this._renderTotalVotes()}
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="color: var(--gold); margin-bottom: 16px; font-size: 16px;">👥 بازیکنان</h3>
          ${this._players.map(player => this._renderVoteCard('player', player)).join('')}
        </div>
        
        <div>
          <h3 style="color: var(--gold); margin-bottom: 16px; font-size: 16px;">🏆 تیم‌ها</h3>
          ${this._teams.map(team => this._renderVoteCard('team', team)).join('')}
        </div>
        
        <p style="color: var(--text-secondary); font-size: 11px; text-align: center; margin-top: 24px;">
          ⚠️ هر کاربر می‌تواند یک بار در روز رأی دهد
        </p>
      </div>
    `;
  },
  
  _renderAuthWarning() {
    return `
      <div style="background: var(--warning-20); border: 1px solid var(--warning); border-radius: 16px; padding: 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 24px;">🔐</span>
        <div style="flex: 1;">
          <span style="color: var(--warning); font-weight: 700;">برای رأی دادن وارد شوید</span>
          <p style="color: var(--text-secondary); font-size: 11px; margin-top: 4px;">رأی شما در آمار محبوب‌ترین‌ها محاسبه میشود</p>
        </div>
        <button class="btn btn-sm" onclick="Auth._showAuthModal()" style="padding: 8px 16px; font-size: 12px;">ورود</button>
      </div>
    `;
  },
  
  _renderTotalVotes() {
    let totalMale = 0;
    let totalFemale = 0;
    
    Object.values(this._votes).forEach(vote => {
      totalMale += vote.male || 0;
      totalFemale += vote.female || 0;
    });
    
    const total = totalMale + totalFemale;
    const femalePercent = total > 0 ? ((totalFemale / total) * 100).toFixed(1) : 0;
    const malePercent = total > 0 ? ((totalMale / total) * 100).toFixed(1) : 0;
    
    return `
      <div style="background: linear-gradient(135deg, var(--gold-20), var(--bg-card)); border-radius: 20px; padding: 20px; text-align: center;">
        <span style="font-size: 32px;">👥</span>
        <div style="font-size: 32px; font-weight: 900; color: var(--gold); margin-top: 8px;">${Utils.formatNumber(total)}</div>
        <div style="color: var(--text-secondary); font-size: 12px; margin-bottom: 16px;">مجموع آرای مردمی</div>
        
        <div style="display: flex; gap: 20px; justify-content: center;">
          <div>
            <span style="color: var(--blue); font-weight: 900; font-size: 18px;">${Utils.formatNumber(totalMale)}</span>
            <span style="color: var(--text-secondary); font-size: 11px; margin-right: 4px;">(${malePercent}%)</span>
            <div style="color: var(--text-secondary); font-size: 11px;">👨 مردان</div>
          </div>
          <div>
            <span style="color: var(--pink); font-weight: 900; font-size: 18px;">${Utils.formatNumber(totalFemale)}</span>
            <span style="color: var(--text-secondary); font-size: 11px; margin-right: 4px;">(${femalePercent}%)</span>
            <div style="color: var(--text-secondary); font-size: 11px;">👩 زنان</div>
          </div>
        </div>
      </div>
    `;
  },
  
  _renderVoteCard(type, item) {
    const votes = this._votes[item.id] || { female: 0, male: 0, total: 0 };
    const total = votes.female + votes.male;
    const femalePercent = total > 0 ? (votes.female / total) * 100 : 0;
    const malePercent = total > 0 ? (votes.male / total) * 100 : 0;
    
    return `
      <div style="background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 20px; padding: 20px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
          <div style="width: 70px; height: 70px; background: linear-gradient(135deg, var(--gold-20), var(--bg-card)); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 36px;">
            ${type === 'player' ? item.image : item.icon}
          </div>
          <div style="flex: 1;">
            <div style="font-size: 18px; font-weight: 900; color: var(--gold);">${item.name}</div>
            <div style="color: var(--text-secondary); font-size: 13px; margin-top: 4px;">
              ${type === 'player' ? `${item.team} | ${item.position}` : `${item.rank} امتیاز`}
            </div>
            ${type === 'player' && item.stats ? `
              <div style="display: flex; gap: 16px; margin-top: 8px;">
                <span style="font-size: 12px;">⚽ ${item.stats.goals || 0} گل</span>
                <span style="font-size: 12px;">🎯 ${item.stats.assists || 0} پاس گل</span>
              </div>
            ` : ''}
          </div>
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: 900; color: var(--gold);">${Utils.formatNumber(total)}</div>
            <div style="color: var(--text-secondary); font-size: 11px;">کل آرا</div>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
          <button class="btn ${!Royal.get('user.phone') ? 'btn-disabled' : ''}" 
                  style="background: var(--blue-10); color: var(--blue); border: 1px solid var(--blue);"
                  onclick="Vote.submit('${item.id}', 'male')"
                  ${!Royal.get('user.phone') ? 'disabled' : ''}>
            <span style="font-size: 20px;">👨</span>
            <span style="font-weight: 700;">${Utils.formatNumber(votes.male)}</span>
            <span style="font-size: 11px;">(${femalePercent.toFixed(1)}%)</span>
          </button>
          
          <button class="btn ${!Royal.get('user.phone') ? 'btn-disabled' : ''}"
                  style="background: var(--pink-10); color: var(--pink); border: 1px solid var(--pink);"
                  onclick="Vote.submit('${item.id}', 'female')"
                  ${!Royal.get('user.phone') ? 'disabled' : ''}>
            <span style="font-size: 20px;">👩</span>
            <span style="font-weight: 700;">${Utils.formatNumber(votes.female)}</span>
            <span style="font-size: 11px;">(${malePercent.toFixed(1)}%)</span>
          </button>
        </div>
        
        <div style="display: flex; gap: 8px; margin-top: 16px;">
          <div style="flex: ${malePercent}; height: 8px; background: var(--blue); border-radius: 4px;"></div>
          <div style="flex: ${femalePercent}; height: 8px; background: var(--pink); border-radius: 4px;"></div>
        </div>
      </div>
    `;
  },
  
  // ========== SUBMIT VOTE ==========
  submit(targetId, gender) {
    // Check authentication
    if (!Royal.get('user.phone')) {
      Toast.show('❌ برای رأی دادن باید وارد شوید', 'error');
      Auth._showAuthModal();
      return false;
    }
    
    // Check if user has voted today
    const lastVote = localStorage.getItem(`vote_${targetId}_${Royal.get('user.id')}`);
    const today = new Date().toDateString();
    
    if (lastVote === today) {
      Toast.show('❌ شما امروز قبلاً رأی داده‌اید', 'error');
      return false;
    }
    
    // Initialize vote object if not exists
    if (!this._votes[targetId]) {
      this._votes[targetId] = { female: 0, male: 0, total: 0 };
    }
    
    // Add vote
    this._votes[targetId][gender] += 1;
    this._votes[targetId].total += 1;
    
    // Save to store
    Royal.set('votes', this._votes);
    
    // Save vote timestamp
    localStorage.setItem(`vote_${targetId}_${Royal.get('user.id')}`, today);
    
    // Add points
    Royal.update('stats.points', p => p + 10);
    
    // Haptic feedback
    Royal.haptic('light');
    
    // Show success
    Toast.show(`✅ رأی شما ثبت شد (+۱۰ امتیاز)`, 'success');
    
    // Refresh page
    Router.refresh();
    
    return true;
  },
  
  // ========== GET VOTE STATS ==========
  getVotes(targetId) {
    return this._votes[targetId] || { female: 0, male: 0, total: 0 };
  },
  
  // ========== GET LEADERBOARD ==========
  getLeaderboard(type = 'all') {
    const items = [];
    
    if (type === 'players' || type === 'all') {
      this._players.forEach(player => {
        items.push({
          id: player.id,
          name: player.name,
          team: player.team,
          image: player.image,
          votes: this.getVotes(player.id).total,
          type: 'player'
        });
      });
    }
    
    if (type === 'teams' || type === 'all') {
      this._teams.forEach(team => {
        items.push({
          id: team.id,
          name: team.name,
          icon: team.icon,
          votes: this.getVotes(team.id).total,
          type: 'team'
        });
      });
    }
    
    return items.sort((a, b) => b.votes - a.votes);
  }
};

window.Vote = Vote;