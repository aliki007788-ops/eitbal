/* ===========================================
   MODULE: PAYMENT - درگاه پرداخت ایتا
   نسخه: 2.0.0
   وضعیت: ✅ مستقل - درآمدزایی حلال
   ⚠️ شرعی: فروش مستقیم - بدون شبهه قمار
=========================================== */

const Payment = {
  // ========== PAYMENT METHODS ==========
  _methods: [
    {
      id: 'eitaa',
      name: 'پرداخت امن ایتا',
      icon: '📱',
      description: 'پرداخت مستقیم از طریق ربات ایتا',
      enabled: true
    },
    {
      id: 'zarinpal',
      name: 'زرین‌پال',
      icon: '🟡',
      description: 'پرداخت با کارت‌های بانکی',
      enabled: false
    },
    {
      id: 'idpay',
      name: 'آیدی پی',
      icon: '🔵',
      description: 'پرداخت با کلیه کارت‌های عضو شتاب',
      enabled: false
    }
  ],
  
  // ========== PRICING PLANS ==========
  _plans: [
    // 💎 فروش مستقیم سکه - بدون شبهه (کالای دیجیتال)
    {
      id: 'coins_10000',
      name: '۱۰,۰۰۰ سکه',
      description: 'مناسب برای شروع',
      price: 10000,
      coins: 10000,
      bonus: 0,
      popular: false,
      discount: 0,
      type: 'coins'
    },
    {
      id: 'coins_50000',
      name: '۵۰,۰۰۰ سکه',
      description: '۱۰٪ سکه جایزه',
      price: 45000,
      coins: 50000,
      bonus: 5000,
      popular: true,
      discount: 10,
      type: 'coins'
    },
    {
      id: 'coins_100000',
      name: '۱۰۰,۰۰۰ سکه',
      description: '۱۵٪ سکه جایزه',
      price: 85000,
      coins: 100000,
      bonus: 15000,
      popular: false,
      discount: 15,
      type: 'coins'
    },
    {
      id: 'coins_500000',
      name: '۵۰۰,۰۰۰ سکه',
      description: '۲۰٪ سکه جایزه',
      price: 400000,
      coins: 500000,
      bonus: 100000,
      popular: false,
      discount: 20,
      type: 'coins'
    },
    
    // 👑 اشتراک ویژه - فروش مستقیم
    {
      id: 'premium_1',
      name: 'اشتراک رویال ماهانه',
      description: '۳۰ روز دسترسی ویژه',
      price: 99000,
      duration: 30,
      features: ['بوستر ۱.۵×', 'قاب طلایی', 'اسم طلایی', 'انرژی +۵۰۰'],
      popular: true,
      discount: 0,
      type: 'premium'
    },
    {
      id: 'premium_3',
      name: 'اشتراک رویال ۳ ماهه',
      description: '۹۰ روز دسترسی ویژه',
      price: 249000,
      duration: 90,
      features: ['بوستر ۱.۷×', 'قاب الماسی', 'تاج اختصاصی', 'پشتیبانی ویژه'],
      popular: false,
      discount: 16,
      type: 'premium'
    }
  ],
  
  // ========== TRANSACTION HISTORY ==========
  _transactions: [],
  
  // ========== INITIALIZE ==========
  init() {
    // Load transactions from store
    const saved = Royal.get('transactions') || [];
    this._transactions = saved;
    
    console.log('✅ Payment module initialized');
  },
  
  // ========== SHOW PAYMENT MODAL ==========
  showPaymentModal() {
    const modal = document.createElement('div');
    modal.className = 'royal-modal active';
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 450px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h3 style="color: var(--gold); display: flex; align-items: center; gap: 8px;">
            <span>💰</span>
            <span>شارژ کیف پول</span>
          </h3>
          <button class="btn-close" onclick="this.closest('.royal-modal').remove()" 
                  style="background: none; border: none; color: var(--text-secondary); font-size: 24px; cursor: pointer;">
            &times;
          </button>
        </div>
        
        <!-- Current Balance -->
        <div style="background: linear-gradient(135deg, var(--gold-20), var(--bg-card)); border-radius: 20px; padding: 20px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <span style="color: var(--text-secondary); font-size: 12px;">موجودی فعلی</span>
            <div style="font-size: 28px; font-weight: 900; color: var(--gold); margin-top: 4px;">
              ${Utils.formatNumber(Royal.get('stats.coins'))}
            </div>
          </div>
          <span style="font-size: 48px;">💰</span>
        </div>
        
        <!-- Coin Packages -->
        <h4 style="color: var(--gold); margin-bottom: 16px; font-size: 14px;">📦 بسته‌های سکه</h4>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px;">
          ${this._plans.filter(p => p.type === 'coins').map(plan => this._renderCoinPackage(plan)).join('')}
        </div>
        
        <!-- Premium Plans -->
        <h4 style="color: var(--gold); margin-bottom: 16px; font-size: 14px;">👑 اشتراک رویال</h4>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px;">
          ${this._plans.filter(p => p.type === 'premium').map(plan => this._renderPremiumPlan(plan)).join('')}
        </div>
        
        <!-- Payment Methods -->
        <div style="background: var(--bg-card); border-radius: 16px; padding: 16px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <span style="font-size: 20px;">🔒</span>
            <span style="font-weight: 700; color: var(--gold);">روش‌های پرداخت</span>
          </div>
          <div style="display: flex; gap: 12px;">
            ${this._methods.filter(m => m.enabled).map(method => `
              <div style="flex: 1; background: var(--bg-primary); border: 1px solid var(--gold-30); border-radius: 12px; padding: 12px; text-align: center;">
                <span style="font-size: 24px;">${method.icon}</span>
                <div style="font-size: 11px; margin-top: 4px;">${method.name}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <p style="color: var(--text-secondary); font-size: 11px; text-align: center;">
          ⚠️ تمامی پرداخت‌ها از طریق درگاه امن ایتا انجام میشود.<br>
          خرید سکه صرفاً برای استفاده در بازی است و قابل بازگشت نیست.
        </p>
      </div>
    `;
    
    document.body.appendChild(modal);
  },
  
  _renderCoinPackage(plan) {
    const isPopular = plan.popular;
    
    return `
      <div style="
        background: ${isPopular ? 'linear-gradient(135deg, var(--gold-20), var(--bg-card))' : 'var(--bg-card)'};
        border: 2px solid ${isPopular ? 'var(--gold)' : 'var(--gold-30)'};
        border-radius: 20px;
        padding: 20px;
        position: relative;
        cursor: pointer;
        transition: var(--transition-normal);
      " onclick="Payment.processPayment('${plan.id}')">
        ${isPopular ? `
          <div style="position: absolute; top: -10px; right: 20px; background: var(--gold); color: black; padding: 4px 16px; border-radius: 20px; font-size: 11px; font-weight: 900;">
            پرفروش
          </div>
        ` : ''}
        
        ${plan.discount > 0 ? `
          <div style="position: absolute; top: -10px; left: 20px; background: var(--error); color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 900;">
            ${plan.discount}٪ تخفیف
          </div>
        ` : ''}
        
        <div style="text-align: center;">
          <span style="font-size: 36px;">💰</span>
          <div style="font-size: 22px; font-weight: 900; color: var(--gold); margin-top: 8px;">
            ${Utils.formatNumber(plan.coins)}
          </div>
          <div style="color: var(--text-secondary); font-size: 11px; margin-top: 4px;">
            ${plan.description}
          </div>
          
          ${plan.bonus > 0 ? `
            <div style="background: var(--success-20); color: var(--success); padding: 4px 12px; border-radius: 20px; font-size: 11px; margin-top: 12px;">
              +${Utils.formatNumber(plan.bonus)} سکه جایزه
            </div>
          ` : ''}
          
          <div style="font-size: 20px; font-weight: 900; color: var(--gold); margin-top: 16px;">
            ${Utils.formatCurrency(plan.price)}
          </div>
          
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 8px;">
            هر سکه = ${Math.round(plan.price / plan.coins * 100) / 100} تومان
          </div>
        </div>
      </div>
    `;
  },
  
  _renderPremiumPlan(plan) {
    const isPopular = plan.popular;
    
    return `
      <div style="
        background: ${isPopular ? 'linear-gradient(135deg, var(--gold-20), var(--bg-card))' : 'var(--bg-card)'};
        border: 2px solid ${isPopular ? 'var(--gold)' : 'var(--gold-30)'};
        border-radius: 20px;
        padding: 20px;
        position: relative;
        cursor: pointer;
        transition: var(--transition-normal);
      " onclick="Payment.processPayment('${plan.id}')">
        ${isPopular ? `
          <div style="position: absolute; top: -10px; right: 20px; background: var(--gold); color: black; padding: 4px 16px; border-radius: 20px; font-size: 11px; font-weight: 900;">
            پیشنهاد ویژه
          </div>
        ` : ''}
        
        ${plan.discount > 0 ? `
          <div style="position: absolute; top: -10px; left: 20px; background: var(--error); color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 900;">
            ${plan.discount}٪ تخفیف
          </div>
        ` : ''}
        
        <div style="text-align: center;">
          <span style="font-size: 36px;">👑</span>
          <div style="font-size: 20px; font-weight: 900; color: var(--gold); margin-top: 8px;">
            ${plan.name}
          </div>
          <div style="color: var(--text-secondary); font-size: 11px; margin-top: 4px;">
            ${plan.description}
          </div>
          
          <div style="margin-top: 16px; text-align: right; padding: 12px; background: var(--bg-primary); border-radius: 12px;">
            ${plan.features.map(f => `
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; font-size: 11px;">
                <span style="color: var(--gold);">✓</span>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>
          
          <div style="font-size: 20px; font-weight: 900; color: var(--gold); margin-top: 16px;">
            ${Utils.formatCurrency(plan.price)}
          </div>
          
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 8px;">
            ${plan.duration} روز اعتبار
          </div>
        </div>
      </div>
    `;
  },
  
  // ========== PROCESS PAYMENT ==========
  async processPayment(planId) {
    // Check authentication
    if (!Royal.get('user.phone')) {
      Toast.show('❌ لطفاً ابتدا وارد شوید', 'error');
      Auth._showAuthModal();
      return;
    }
    
    const plan = this._plans.find(p => p.id === planId);
    if (!plan) {
      Toast.show('❌ محصول یافت نشد', 'error');
      return;
    }
    
    try {
      Toast.show('🔄 در حال اتصال به درگاه پرداخت...', 'info');
      
      // Generate transaction ID
      const transactionId = `TRX-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      
      // Create transaction record
      const transaction = {
        id: transactionId,
        planId: plan.id,
        planName: plan.name,
        amount: plan.price,
        coins: plan.coins || 0,
        bonus: plan.bonus || 0,
        type: plan.type,
        status: 'pending',
        timestamp: Date.now(),
        userId: Royal.get('user.id')
      };
      
      this._transactions.push(transaction);
      Royal.set('transactions', this._transactions);
      
      // Eitaa Payment
      if (window.Eitaa?.WebApp?.openInvoice) {
        window.Eitaa.WebApp.openInvoice({
          amount: plan.price,
          currency: 'IRR',
          description: `خرید ${plan.name}`,
          payload: JSON.stringify({
            transactionId: transactionId,
            userId: Royal.get('user.id'),
            planId: plan.id,
            timestamp: Date.now()
          }),
          onSuccess: (payment) => {
            this._handlePaymentSuccess(transactionId, payment);
          },
          onFail: () => {
            this._handlePaymentFailure(transactionId);
          }
        });
      } else {
        // Fallback for development
        Toast.show('⚠️ درگاه پرداخت در حال اتصال است', 'warning');
        
        // Simulate successful payment
        setTimeout(() => {
          this._handlePaymentSuccess(transactionId, { id: 'simulated' });
        }, 2000);
      }
      
    } catch (error) {
      console.error('❌ Payment error:', error);
      Toast.show('❌ خطا در اتصال به درگاه پرداخت', 'error');
    }
  },
  
  _handlePaymentSuccess(transactionId, payment) {
    // Update transaction
    const transaction = this._transactions.find(t => t.id === transactionId);
    if (transaction) {
      transaction.status = 'completed';
      transaction.paymentId = payment.id;
      transaction.completedAt = Date.now();
    }
    
    Royal.set('transactions', this._transactions);
    
    // Add coins or activate premium
    if (transaction.type === 'coins') {
      const totalCoins = transaction.coins + (transaction.bonus || 0);
      Royal.update('stats.coins', c => c + totalCoins);
      Toast.show(`✅ ${Utils.formatNumber(totalCoins)} سکه به کیف پول شما اضافه شد`, 'success');
    } else if (transaction.type === 'premium') {
      const plan = this._plans.find(p => p.id === transaction.planId);
      if (plan) {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + plan.duration);
        
        Royal.set('user.isPremium', true);
        Royal.set('user.premiumExpiry', expiry.toISOString());
        Royal.set('stats.tapBoost', 1.5);
        Royal.set('stats.maxEnergy', 1500);
        
        Toast.show(`✅ اشتراک رویال ${plan.duration} روزه فعال شد`, 'success');
      }
    }
    
    // Close modal
    document.querySelector('.royal-modal')?.remove();
    
    // Haptic feedback
    Royal.haptic('success');
    
    // Refresh page
    Router.refresh();
  },
  
  _handlePaymentFailure(transactionId) {
    const transaction = this._transactions.find(t => t.id === transactionId);
    if (transaction) {
      transaction.status = 'failed';
    }
    
    Royal.set('transactions', this._transactions);
    Toast.show('❌ پرداخت ناموفق', 'error');
  },
  
  // ========== TRANSACTION HISTORY ==========
  showHistory() {
    const userTransactions = this._transactions
      .filter(t => t.userId === Royal.get('user.id'))
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);
    
    const modal = document.createElement('div');
    modal.className = 'royal-modal active';
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 400px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h3 style="color: var(--gold); display: flex; align-items: center; gap: 8px;">
            <span>📋</span>
            <span>تاریخچه تراکنش‌ها</span>
          </h3>
          <button class="btn-close" onclick="this.closest('.royal-modal').remove()" 
                  style="background: none; border: none; color: var(--text-secondary); font-size: 24px; cursor: pointer;">
            &times;
          </button>
        </div>
        
        ${userTransactions.length === 0 ? `
          <div style="text-align: center; padding: 40px;">
            <span style="font-size: 48px;">🛒</span>
            <p style="color: var(--text-secondary); margin-top: 16px;">تاکنون خریدی انجام نداده‌اید</p>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${userTransactions.map(t => `
              <div style="display: flex; align-items: center; gap: 12px; padding: 16px; background: var(--bg-card); border-radius: 16px;">
                <span style="font-size: 32px;">${t.type === 'premium' ? '👑' : '💰'}</span>
                <div style="flex: 1;">
                  <div style="font-weight: 700;">${t.planName}</div>
                  <div style="display: flex; gap: 16px; margin-top: 4px;">
                    <span style="font-size: 11px; color: var(--text-secondary);">
                      ${new Date(t.timestamp).toLocaleDateString('fa-IR')}
                    </span>
                    <span style="font-size: 11px; color: ${t.status === 'completed' ? 'var(--success)' : 'var(--error)'};">
                      ${t.status === 'completed' ? 'موفق' : 'ناموفق'}
                    </span>
                  </div>
                </div>
                <div style="text-align: left;">
                  <div style="font-weight: 900; color: var(--gold);">${Utils.formatCurrency(t.amount)}</div>
                  ${t.coins ? `<div style="font-size: 11px; color: var(--text-secondary);">${Utils.formatNumber(t.coins)} سکه</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
    
    document.body.appendChild(modal);
  }
};

window.Payment = Payment;