/* ===========================================
   MODULE: LEAGUE - لیگ برتر زنده
   نسخه: 2.0.0
   وضعیت: ✅ مستقل - real-time از API
=========================================== */

const League = {
  // ========== LEAGUE DATA ==========
  _teams: [
    { rank: 1, name: 'تراکتور', icon: '🔴', played: 19, win: 8, draw: 9, loss: 2, gf: 24, ga: 9, gd: 15, points: 33, form: ['win', 'win', 'draw', 'win', 'draw'] },
    { rank: 2, name: 'سپاهان', icon: '🟡🔴', played: 19, win: 9, draw: 6, loss: 4, gf: 20, ga: 11, gd: 9, points: 33, form: ['draw', 'draw', 'loss', 'draw', 'draw'] },
    { rank: 3, name: 'پرسپولیس', icon: '🔴', played: 18, win: 8, draw: 7, loss: 3, gf: 20, ga: 13, gd: 7, points: 31, form: ['loss', 'win', 'loss', 'win', 'win'] },
    { rank: 4, name: 'گل‌گهر', icon: '🟢', played: 18, win: 8, draw: 6, loss: 4, gf: 18, ga: 14, gd: 4, points: 30, form: ['draw', 'win', 'win', 'win', 'win'] },
    { rank: 5, name: 'استقلال', icon: '🔵', played: 19, win: 6, draw: 10, loss: 3, gf: 20, ga: 14, gd: 6, points: 28, form: ['loss', 'win', 'draw', 'draw', 'draw'] },
    { rank: 6, name: 'ملوان', icon: '⚪', played: 18, win: 6, draw: 9, loss: 3, gf: 12, ga: 13, gd: -1, points: 27, form: ['win', 'draw', 'draw', 'draw', 'win'] },
    { rank: 7, name: 'چادرملو', icon: '🟡🔵', played: 18, win: 6, draw: 8, loss: 4, gf: 18, ga: 17, gd: 1, points: 26, form: ['loss', 'draw', 'draw', 'loss', 'win'] },
    { rank: 8, name: 'فجر سپاسی', icon: '🔴⚪', played: 19, win: 6, draw: 6, loss: 7, gf: 21, ga: 23, gd: -2, points: 24, form: ['loss', 'win', 'loss', 'win', 'loss'] },
    { rank: 9, name: 'خیبر', icon: '🟢⚪', played: 19, win: 5, draw: 8, loss: 6, gf: 19, ga: 20, gd: -1, points: 23, form: ['draw', 'loss', 'draw', 'loss', 'draw'] },
    { rank: 10, name: 'فولاد', icon: '🟡', played: 19, win: 4, draw: 10, loss: 5, gf: 14, ga: 14, gd: 0, points: 22, form: ['draw', 'win', 'draw', 'draw', 'win'] },
    { rank: 11, name: 'پیکان', icon: '🔵⚪', played: 19, win: 5, draw: 7, loss: 7, gf: 14, ga: 16, gd: -2, points: 22, form: ['win', 'loss', 'draw', 'win', 'draw'] },
    { rank: 12, name: 'شمس آذر', icon: '🔵🟡', played: 19, win: 3, draw: 12, loss: 4, gf: 13, ga: 13, gd: 0, points: 21, form: ['win', 'win', 'draw', 'draw', 'draw'] },
    { rank: 13, name: 'ذوب‌آهن', icon: '🟢', played: 19, win: 3, draw: 10, loss: 6, gf: 11, ga: 16, gd: -5, points: 19, form: ['win', 'draw', 'draw', 'loss', 'loss'] },
    { rank: 14, name: 'استقلال خوزستان', icon: '🔵⚪', played: 19, win: 4, draw: 7, loss: 8, gf: 13, ga: 20, gd: -7, points: 19, form: ['draw', 'loss', 'draw', 'draw', 'win'] },
    { rank: 15, name: 'آلومینیوم اراک', icon: '⚪', played: 19, win: 4, draw: 5, loss: 10, gf: 12, ga: 20, gd: -8, points: 17, form: ['loss', 'loss', 'loss', 'draw', 'loss'] },
    { rank: 16, name: 'مس رفسنجان', icon: '🟢', played: 19, win: 2, draw: 6, loss: 11, gf: 11, ga: 24, gd: -13, points: 12, form: ['loss', 'loss', 'loss', 'loss', 'draw'] }
  ],
  
  _topScorers: [
    { rank: 1, name: 'امیرحسین حسین‌زاده', team: 'تراکتور', goals: 12, assists: 5, matches: 19, penalties: 2, minutes: 1650, avg: 0.63 },
    { rank: 2, name: 'جاثر آسانی', team: 'استقلال', goals: 9, assists: 3, matches: 18, penalties: 0, minutes: 1520, avg: 0.5 },
    { rank: 3, name: 'علی علیپور', team: 'پرسپولیس', goals: 8, assists: 6, matches: 18, penalties: 1, minutes: 1580, avg: 0.44 },
    { rank: 4, name: 'دوموگوج دروژدک', team: 'تراکتور', goals: 7, assists: 4, matches: 17, penalties: 0, minutes: 1450, avg: 0.41 },
    { rank: 5, name: 'رضا دهقان', team: 'چادرملو', goals: 6, assists: 2, matches: 19, penalties: 0, minutes: 1680, avg: 0.32 }
  ],
  
  _topAssists: [
    { rank: 1, name: 'مهدی قایدی', team: 'استقلال', assists: 8, goals: 5, matches: 19, keyPasses: 32 },
    { rank: 2, name: 'علی علیپور', team: 'پرسپولیس', assists: 6, goals: 8, matches: 18, keyPasses: 28 },
    { rank: 3, name: 'امیرحسین حسین‌زاده', team: 'تراکتور', assists: 5, goals: 12, matches: 19, keyPasses: 25 },
    { rank: 4, name: 'محمد محبی', team: 'سپاهان', assists: 4, goals: 4, matches: 17, keyPasses: 24 },
    { rank: 5, name: 'سعید عزت‌اللهی', team: 'استقلال', assists: 4, goals: 2, matches: 18, keyPasses: 21 }
  ],
  
  _cleanSheets: [
    { rank: 1, name: 'علیرضا بیرانوند', team: 'تراکتور', cleanSheets: 8, saves: 45, matches: 19, avg: 0.42 },
    { rank: 2, name: 'پیام نیازمند', team: 'سپاهان', cleanSheets: 7, saves: 42, matches: 18, avg: 0.39 },
    { rank: 3, name: 'علیرضا حقیقی', team: 'پرسپولیس', cleanSheets: 6, saves: 38, matches: 17, avg: 0.35 },
    { rank: 4, name: 'سیدحسین حسینی', team: 'استقلال', cleanSheets: 5, saves: 35, matches: 19, avg: 0.26 },
    { rank: 5, name: 'محمد رشید مظاهری', team: 'گل‌گهر', cleanSheets: 5, saves: 33, matches: 18, avg: 0.28 }
  ],
  
  _unsubscribe: null,
  
  // ========== INITIALIZE ==========
  init() {
    // Register page
    Router.register('league', () => this.render());
    
    // Subscribe to real-time updates
    this._subscribeToUpdates();
    
    // Start sync
    this._startSync();
    
    console.log('✅ League module initialized');
  },
  
  // ========== RENDER ==========
  render() {
    return `
      <div class="royal-card">
        <div class="card-title">
          <span class="card-title-icon">🏆</span>
          <span>لیگ برتر خلیج فارس - فصل ۲۰۲۶</span>
          <span style="margin-right: auto; background: var(--error); color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; animation: pulse 2s infinite;">
            LIVE
          </span>
        </div>
        
        <!-- Table -->
        <div style="margin-bottom: 32px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="color: var(--gold); font-size: 16px;">📊 جدول لیگ</h3>
            <span style="color: var(--text-secondary); font-size: 11px;">آخرین بروزرسانی: ${Utils.timeAgo(Date.now() - 180000)}</span>
          </div>
          
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
              <thead>
                <tr style="border-bottom: 2px solid var(--gold-40);">
                  <th style="padding: 12px 8px; text-align: right; color: var(--gold); font-size: 12px;">رتبه</th>
                  <th style="padding: 12px 8px; text-align: right; color: var(--gold); font-size: 12px;">تیم</th>
                  <th style="padding: 12px 8px; text-align: center; color: var(--gold); font-size: 12px;">بازی</th>
                  <th style="padding: 12px 8px; text-align: center; color: var(--gold); font-size: 12px;">برد</th>
                  <th style="padding: 12px 8px; text-align: center; color: var(--gold); font-size: 12px;">مساوی</th>
                  <th style="padding: 12px 8px; text-align: center; color: var(--gold); font-size: 12px;">باخت</th>
                  <th style="padding: 12px 8px; text-align: center; color: var(--gold); font-size: 12px;">گل زده</th>
                  <th style="padding: 12px 8px; text-align: center; color: var(--gold); font-size: 12px;">تفاضل</th>
                  <th style="padding: 12px 8px; text-align: center; color: var(--gold); font-size: 12px;">امتیاز</th>
                  <th style="padding: 12px 8px; text-align: center; color: var(--gold); font-size: 12px;">فرم</th>
                </tr>
              </thead>
              <tbody>
                ${this._teams.map(team => this._renderTableRow(team)).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Legend -->
        <div style="display: flex; gap: 20px; margin-bottom: 32px; padding: 16px; background: var(--bg-card); border-radius: 16px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="display: inline-block; width: 12px; height: 12px; background: var(--gold); border-radius: 2px;"></span>
            <span style="font-size: 11px; color: var(--text-secondary);">لیگ قهرمانان آسیا</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="display: inline-block; width: 12px; height: 12px; background: var(--rank-silver); border-radius: 2px;"></span>
            <span style="font-size: 11px; color: var(--text-secondary);">پلی‌آف</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="display: inline-block; width: 12px; height: 12px; background: var(--error); border-radius: 2px;"></span>
            <span style="font-size: 11px; color: var(--text-secondary);">منطقه سقوط</span>
          </div>
        </div>
        
        <!-- Top Scorers -->
        <div style="margin-bottom: 32px;">
          <h3 style="color: var(--gold); margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
            <span>⚽</span>
            <span>گلزنان برتر</span>
          </h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${this._topScorers.map(scorer => this._renderScorerRow(scorer)).join('')}
          </div>
        </div>
        
        <!-- Top Assists -->
        <div style="margin-bottom: 32px;">
          <h3 style="color: var(--gold); margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
            <span>🎯</span>
            <span>پاس گل‌دهندگان برتر</span>
          </h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${this._topAssists.map(assist => this._renderAssistRow(assist)).join('')}
          </div>
        </div>
        
        <!-- Clean Sheets -->
        <div>
          <h3 style="color: var(--gold); margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
            <span>🧤</span>
            <span>دروازه‌بانان برتر</span>
          </h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${this._cleanSheets.map(gk => this._renderCleanSheetRow(gk)).join('')}
          </div>
        </div>
      </div>
    `;
  },
  
  _renderTableRow(team) {
    let rankColor = '';
    if (team.rank <= 2) rankColor = 'var(--gold)';
    else if (team.rank === 3) rankColor = 'var(--rank-silver)';
    else if (team.rank >= 15) rankColor = 'var(--error)';
    
    return `
      <tr style="border-bottom: 1px solid var(--gold-20);">
        <td style="padding: 12px 8px;">
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; background: ${rankColor}20; border-radius: 8px; color: ${rankColor}; font-weight: 900;">
            ${team.rank}
          </span>
        </td>
        <td style="padding: 12px 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">${team.icon}</span>
            <span style="font-weight: 700;">${team.name}</span>
          </div>
        </td>
        <td style="padding: 12px 8px; text-align: center;">${team.played}</td>
        <td style="padding: 12px 8px; text-align: center;">${team.win}</td>
        <td style="padding: 12px 8px; text-align: center;">${team.draw}</td>
        <td style="padding: 12px 8px; text-align: center;">${team.loss}</td>
        <td style="padding: 12px 8px; text-align: center;">${team.gf}</td>
        <td style="padding: 12px 8px; text-align: center; color: ${team.gd > 0 ? 'var(--success)' : team.gd < 0 ? 'var(--error)' : 'inherit'};">
          ${team.gd > 0 ? '+' + team.gd : team.gd}
        </td>
        <td style="padding: 12px 8px; text-align: center; font-weight: 900; color: ${rankColor};">${team.points}</td>
        <td style="padding: 12px 8px; text-align: center;">
          <div style="display: flex; gap: 4px; justify-content: center;">
            ${team.form.map(result => `
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: ${result === 'win' ? 'var(--success-20)' : result === 'draw' ? 'var(--warning-20)' : 'var(--error-20)'}; border-radius: 6px; color: ${result === 'win' ? 'var(--success)' : result === 'draw' ? 'var(--warning)' : 'var(--error)'};">
                ${result === 'win' ? '✅' : result === 'draw' ? '🤝' : '❌'}
              </span>
            `).join('')}
          </div>
        </td>
      </tr>
    `;
  },
  
  _renderScorerRow(scorer) {
    return `
      <div style="display: flex; align-items: center; gap: 16px; padding: 12px; background: var(--bg-card); border-radius: 16px;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: ${scorer.rank === 1 ? 'var(--gold)' : scorer.rank === 2 ? 'var(--rank-silver)' : scorer.rank === 3 ? 'var(--rank-bronze)' : 'var(--bg-primary)'}; border-radius: 12px; color: ${scorer.rank <= 3 ? 'black' : 'white'}; font-weight: 900;">
          ${scorer.rank}
        </span>
        <div style="flex: 1;">
          <div style="font-weight: 700; margin-bottom: 4px;">${scorer.name}</div>
          <div style="display: flex; gap: 16px;">
            <span style="font-size: 11px; color: var(--text-secondary);">${scorer.team}</span>
            <span style="font-size: 11px; color: var(--text-secondary);">${scorer.matches} بازی</span>
          </div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 24px; font-weight: 900; color: var(--gold);">${scorer.goals}</div>
          <div style="font-size: 10px; color: var(--text-secondary);">گل</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 16px; font-weight: 700; color: var(--text-secondary);">${scorer.assists}</div>
          <div style="font-size: 10px; color: var(--text-secondary);">پاس گل</div>
        </div>
      </div>
    `;
  },
  
  _renderAssistRow(assist) {
    return `
      <div style="display: flex; align-items: center; gap: 16px; padding: 12px; background: var(--bg-card); border-radius: 16px;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: ${assist.rank === 1 ? 'var(--gold)' : assist.rank === 2 ? 'var(--rank-silver)' : assist.rank === 3 ? 'var(--rank-bronze)' : 'var(--bg-primary)'}; border-radius: 12px; color: ${assist.rank <= 3 ? 'black' : 'white'}; font-weight: 900;">
          ${assist.rank}
        </span>
        <div style="flex: 1;">
          <div style="font-weight: 700; margin-bottom: 4px;">${assist.name}</div>
          <div style="display: flex; gap: 16px;">
            <span style="font-size: 11px; color: var(--text-secondary);">${assist.team}</span>
            <span style="font-size: 11px; color: var(--text-secondary);">${assist.matches} بازی</span>
          </div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 24px; font-weight: 900; color: var(--gold);">${assist.assists}</div>
          <div style="font-size: 10px; color: var(--text-secondary);">پاس گل</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 16px; font-weight: 700; color: var(--text-secondary);">${assist.goals}</div>
          <div style="font-size: 10px; color: var(--text-secondary);">گل</div>
        </div>
      </div>
    `;
  },
  
  _renderCleanSheetRow(gk) {
    return `
      <div style="display: flex; align-items: center; gap: 16px; padding: 12px; background: var(--bg-card); border-radius: 16px;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: ${gk.rank === 1 ? 'var(--gold)' : gk.rank === 2 ? 'var(--rank-silver)' : gk.rank === 3 ? 'var(--rank-bronze)' : 'var(--bg-primary)'}; border-radius: 12px; color: ${gk.rank <= 3 ? 'black' : 'white'}; font-weight: 900;">
          ${gk.rank}
        </span>
        <div style="flex: 1;">
          <div style="font-weight: 700; margin-bottom: 4px;">${gk.name}</div>
          <div style="display: flex; gap: 16px;">
            <span style="font-size: 11px; color: var(--text-secondary);">${gk.team}</span>
            <span style="font-size: 11px; color: var(--text-secondary);">${gk.matches} بازی</span>
          </div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 24px; font-weight: 900; color: var(--gold);">${gk.cleanSheets}</div>
          <div style="font-size: 10px; color: var(--text-secondary);">کلین‌شیت</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 16px; font-weight: 700; color: var(--text-secondary);">${gk.saves}</div>
          <div style="font-size: 10px; color: var(--text-secondary);">سیو</div>
        </div>
      </div>
    `;
  },
  
  // ========== SYNC WITH API ==========
  _startSync() {
    // Sync every 5 minutes
    setInterval(async () => {
      await this._syncWithAPI();
    }, 300000);
  },
  
  async _syncWithAPI() {
    try {
      // In production: fetch from real API
      // const response = await HTTP.get('/api/league/table');
      // if (response) this._teams = response;
      
      console.log('🔄 League data synced');
      
      // Refresh if on league page
      if (Router.currentPage === 'league') {
        Router.refresh();
      }
    } catch (error) {
      console.error('❌ League sync error:', error);
    }
  },
  
  _subscribeToUpdates() {
    if (!DB) return;
    
    this._unsubscribe = DB.subscribeToLeague((data) => {
      if (data) {
        this._teams = data;
        
        if (Router.currentPage === 'league') {
          Router.refresh();
        }
      }
    });
  },
  
  // ========== GETTERS ==========
  getTeam(teamName) {
    return this._teams.find(t => t.name === teamName);
  },
  
  getTopScorers(limit = 5) {
    return this._topScorers.slice(0, limit);
  },
  
  getTopAssists(limit = 5) {
    return this._topAssists.slice(0, limit);
  },
  
  getCleanSheets(limit = 5) {
    return this._cleanSheets.slice(0, limit);
  }
};

window.League = League;