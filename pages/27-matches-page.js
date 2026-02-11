/* ===========================================
   PAGE: MATCHES - صفحه مسابقات
   نسخه: 2.0.0
   وضعیت: ✅ فقط قالب - منطق در Prediction module
=========================================== */

Router.register('matches', () => {
  const matches = Prediction._matches;
  
  return `
    <div class="royal-card">
      <div class="card-title">
        <span class="card-title-icon">📅</span>
        <span>مسابقات - هفته هجدهم</span>
        <span style="margin-right: auto; background: var(--error); color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; animation: pulse 2s infinite;">
          LIVE
        </span>
      </div>
      
      ${matches.map(match => `
        <div class="match-card" style="margin-bottom: 20px;">
          <div class="match-header">
            <span class="match-league">🇮🇷 لیگ برتر - هفته ${match.week}</span>
            <span class="match-date">📆 ${match.date} | ⏰ ${match.time}</span>
          </div>
          
          <div class="match-teams">
            <div class="match-team">
              <div class="team-logo">${match.homeIcon}</div>
              <div class="team-name">${match.home}</div>
              <div class="team-rank">رتبه ${match.homeRank} | ${match.homePoints} امتیاز</div>
            </div>
            <div class="match-vs">VS</div>
            <div class="match-team">
              <div class="team-logo">${match.awayIcon}</div>
              <div class="team-name">${match.away}</div>
              <div class="team-rank">رتبه ${match.awayRank} | ${match.awayPoints} امتیاز</div>
            </div>
          </div>
          
          <div class="match-details">
            <span>🏟️ ${match.stadium} - ${match.city}</span>
            <span>⚖️ ${match.referee}</span>
          </div>
          
          <div style="display: flex; gap: 16px; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--gold-30);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--gold);">📺</span>
              <span style="color: var(--text-secondary); font-size: 12px;">پخش زنده: شبکه ۳</span>
            </div>
            <button class="btn btn-sm" style="margin-right: auto;" onclick="Toast.show('🔔 یادآوری ثبت شد', 'gold')">
              🔔 یادآوری
            </button>
          </div>
        </div>
      `).join('')}
      
      <!-- Week Navigation -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--gold-30);">
        <button class="btn btn-outline btn-sm" onclick="Toast.show('🔄 هفته قبل', 'info')" style="padding: 10px 20px;">
          ← هفته قبل
        </button>
        <span style="color: var(--gold); font-weight: 700;">هفته جاری</span>
        <button class="btn btn-outline btn-sm" onclick="Toast.show('🔄 هفته بعد', 'info')" style="padding: 10px 20px;">
          هفته بعد →
        </button>
      </div>
    </div>
  `;
});