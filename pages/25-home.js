/* ===========================================
   PAGE: HOME - صفحه اصلی
   نسخه: 2.0.0
   وضعیت: ✅ فقط قالب - بدون منطق
=========================================== */

Router.register('home', () => {
  const user = Royal.get('user');
  const stats = Royal.get('stats');
  const title = Sidebar._getUserTitle();
  
  return `
    <div class="royal-card">
      <div class="card-title">
        <span class="card-title-icon">👑</span>
        <span>تالار رویال</span>
        ${user.isPremium ? '<span style="background: var(--gold); color: black; padding: 4px 16px; border-radius: 30px; font-size: 11px; font-weight: 900; margin-right: auto;">عضو ویژه</span>' : ''}
      </div>
      
      <!-- User Stats -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
        <div style="background: linear-gradient(135deg, var(--gold-20), var(--bg-card)); border: 1px solid var(--gold-30); border-radius: 20px; padding: 20px; text-align: center;">
          <span style="font-size: 32px;">🔥</span>
          <div style="font-size: 32px; font-weight: 900; color: var(--gold); margin-top: 8px;">${stats.streak}</div>
          <div style="color: var(--text-secondary); font-size: 12px; margin-top: 4px;">روز حضور</div>
        </div>
        <div style="background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 20px; padding: 20px; text-align: center;">
          <span style="font-size: 32px;">🎯</span>
          <div style="font-size: 32px; font-weight: 900; color: var(--gold); margin-top: 8px;">${stats.correctPredictions}</div>
          <div style="color: var(--text-secondary); font-size: 12px; margin-top: 4px;">پیش‌بینی درست</div>
        </div>
      </div>
      
      <!-- User Title -->
      <div style="background: linear-gradient(135deg, var(--gold-20), var(--bg-card)); border-radius: 20px; padding: 20px; margin-bottom: 24px; display: flex; align-items: center; gap: 16px;">
        <div style="width: 70px; height: 70px; background: linear-gradient(135deg, var(--gold), var(--gold-dark)); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 36px;">
          ${title.emoji}
        </div>
        <div>
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">عنوان شما</div>
          <div style="font-size: 20px; font-weight: 900; color: var(--gold); margin-bottom: 8px;">${title.name}</div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 12px; color: var(--text-secondary);">پیشرفت به سطح بعد</span>
            <span style="font-size: 14px; font-weight: 900; color: var(--gold);">${stats.correctPredictions % 5}/5</span>
          </div>
          <div style="width: 200px; height: 6px; background: var(--bg-card); border-radius: 3px; margin-top: 8px; overflow: hidden;">
            <div style="width: ${(stats.correctPredictions % 5) * 20}%; height: 100%; background: linear-gradient(90deg, var(--gold), var(--gold-dark)); border-radius: 3px;"></div>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
        <button class="btn" onclick="Router.goTo('predict')" style="padding: 16px;">
          <span style="font-size: 24px;">🎯</span>
          <span>پیش‌بینی</span>
        </button>
        <button class="btn btn-outline" onclick="Router.goTo('tap')" style="padding: 16px;">
          <span style="font-size: 24px;">👆</span>
          <span>تپ سریع</span>
        </button>
      </div>
      
      <!-- Latest News -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="color: var(--gold); font-size: 16px;">📰 آخرین اخبار</h3>
          <a href="#" onclick="Router.goTo('news'); return false;" style="color: var(--gold); font-size: 12px;">مشاهده همه →</a>
        </div>
        
        <div style="background: var(--bg-card); border: 1px solid var(--gold-20); border-radius: 16px; padding: 16px; display: flex; align-items: center; gap: 16px;">
          <span style="font-size: 32px;">🟢</span>
          <div style="flex: 1;">
            <div style="font-weight: 700; margin-bottom: 4px;">بیرانوند: با تراکتور قهرمان میشویم</div>
            <div style="display: flex; gap: 16px; font-size: 11px; color: var(--text-secondary);">
              <span>ورزش سه</span>
              <span>۲ دقیقه پیش</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- League Leader -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="color: var(--gold); font-size: 16px;">🏆 صدرنشین لیگ</h3>
          <a href="#" onclick="Router.goTo('league'); return false;" style="color: var(--gold); font-size: 12px;">جدول کامل →</a>
        </div>
        
        <div style="background: linear-gradient(135deg, var(--gold-20), var(--bg-card)); border-radius: 20px; padding: 20px; display: flex; align-items: center; gap: 20px;">
          <div style="width: 80px; height: 80px; background: var(--bg-card); border: 2px solid var(--gold); border-radius: 25px; display: flex; align-items: center; justify-content: center; font-size: 48px;">
            🔴
          </div>
          <div>
            <div style="font-size: 24px; font-weight: 900; color: var(--gold); margin-bottom: 4px;">تراکتور</div>
            <div style="display: flex; gap: 24px;">
              <span style="color: var(--gold);">۳۳ امتیاز</span>
              <span style="color: var(--success);">۸ برد</span>
              <span style="color: var(--text-secondary);">تفاضل +۱۵</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});