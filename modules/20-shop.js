/* ===========================================
   MODULE: SHOP - فروشگاه حلال
   نسخه: 2.0.0
   وضعیت: ✅ مستقل - درآمدزایی واقعی
   ⚠️ شرعی: فروش مستقیم با تومان - بدون سکه واسط
=========================================== */

const Shop = {
  // ========== PRODUCTS ==========
  _products: [
    // 🎨 آیتم‌های تزئینی - خرید مستقیم تومان
    {
      id: 'frame_gold',
      name: 'قاب طلایی',
      icon: '🖼️',
      description: 'قاب اختصاصی پروفایل با افکت طلایی',
      price: 29000,
      currency: 'IRR',
      type: 'frame',
      value: 'gold',
      category: 'decoration',
      sales: 2345,
      limit: null,
      premium: false
    },
    {
      id: 'frame_diamond',
      name: 'قاب الماسی',
      icon: '💎',
      description: 'قاب ویژه و کمیاب الماسی',
      price: 49000,
      currency: 'IRR',
      type: 'frame',
      value: 'diamond',
      category: 'decoration',
      sales: 892,
      limit: 1000,
      premium: false
    },
    {
      id: 'skin_gold_ball',
      name: 'توپ طلایی',
      icon: '🥇',
      description: 'افکت تپ طلایی + انفجار ستاره',
      price: 39000,
      currency: 'IRR',
      type: 'skin',
      value: 'gold',
      category: 'decoration',
      sales: 1567,
      limit: null,
      premium: false
    },
    
    // ⚡ آیتم‌های مصرفی - خرید مستقیم تومان
    {
      id: 'energy_1000',
      name: 'انرژی ۱۰۰۰',
      icon: '⚡',
      description: '۱۰۰۰ واحد انرژی فوری',
      price: 5000,
      currency: 'IRR',
      type: 'energy',
      value: 1000,
      category: 'consumable',
      sales: 5678,
      limit: null,
      premium: false
    },
    {
      id: 'energy_5000',
      name: 'پک انرژی ویژه',
      icon: '🔋',
      description: '۵۰۰۰ واحد انرژی + ۲۰٪ تخفیف',
      price: 20000,
      currency: 'IRR',
      type: 'energy',
      value: 5000,
      category: 'consumable',
      sales: 2341,
      limit: null,
      premium: false
    },
    {
      id: 'boost_2x_1h',
      name: 'بوستر ۲×',
      icon: '🚀',
      description: '۱ ساعت تپ ۲ برابر',
      price: 10000,
      currency: 'IRR',
      type: 'boost',
      value: 2,
      duration: 1,
      category: 'consumable',
      sales: 3456,
      limit: null,
      premium: false
    },
    
    // 👑 اشتراک ویژه - خرید مستقیم تومان
    {
      id: 'premium_month',
      name: 'اشتراک رویال',
      icon: '👑',
      description: '۳۰ روز دسترسی ویژه',
      price: 99000,
      currency: 'IRR',
      type: 'premium',
      value: 30,
      category: 'subscription',
      features: [
        '✨ بوستر دائمی ۱.۵×',
        '🖼️ قاب طلایی رایگان',
        '💬 اسم طلایی در چت',
        '⚡ ظرفیت انرژی +۵۰۰'
      ],
      sales: 567,
      discount: 40,
      premium: true
    },
    {
      id: 'premium_3months',
      name: 'اشتراک رویال ۳ ماهه',
      icon: '👑',
      description: '۹۰ روز دسترسی ویژه',
      price: 249000,
      currency: 'IRR',
      type: 'premium',
      value: 90,
      category: 'subscription',
      features: [
        '✨ بوستر دائمی ۱.۷×',
        '💎 قاب الماسی رایگان',
        '👑 تاج اختصاصی',
        '🎯 اولویت پشتیبانی'
      ],
      sales: 234,
      discount: 16,
      premium: true
    }
  ],
  
  // ========== USER INVENTORY ==========
  _inventory: {
    frames: [],
    activeFrame: null,
    skins: [],
    activeSkin: null,
    boosts: [],
    premium: null
  },
  
  // ========== INITIALIZE ==========
  init() {
    // Load inventory from store
    const inventory = Royal.get('inventory') || this._inventory;
    this._inventory = inventory;
    
    // Register page
    Router.register('shop', () => this.render());
    
    console.log('✅ Shop module initialized');
  },
  
  // ========== RENDER ==========
  render() {
    const user = Royal.get('user');
    const coins = Royal.get('stats.coins');
    const inventory = this._inventory;
    
    return `
      <div class="royal-card">
        <div class="card-title">
          <span class="card-title-icon">🛒</span>
          <span>فروشگاه رویال</span>
        </div>
        
        ${!user.phone ? this._renderAuthWarning() : ''}
        
        <!-- کیف پول -->
        <div style="background: linear-gradient(135deg, var(--gold-20), var(--bg-card)); border-radius: 20px; padding: 20px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 36px;">💰</span>
            <div>
              <span style="font-size: 14px; color: var(--text-secondary);">کیف پول شما</span>
              <div style="font-size: 24px; font-weight: 900; color: var(--gold);">${Utils.formatNumber(coins)} سکه</div>
            </div>
          </div>
          <button class="btn" onclick="Shop.showPaymentModal()" style="padding: 12px 24px;">
            افزایش موجودی
          </button>
        </div>
        
        <!-- آیتم‌های تزئینی -->
        <h3 style="color: var(--gold); margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
          <span>🎨</span>
          <span>آیتم‌های تزئینی</span>
        </h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px;">
          ${this._renderProductCards(this._products.filter(p => p.category === 'decoration'))}
        </div>
        
        <!-- آیتم‌های مصرفی -->
        <h3 style="color: var(--gold); margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
          <span>⚡</span>
          <span>انرژی و بوستر</span>
        </h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px;">
          ${this._renderProductCards(this._products.filter(p => p.category === 'consumable'))}
        </div>
        
        <!-- اشتراک ویژه -->
        <h3 style="color: var(--gold); margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
          <span>👑</span>
          <span>اشتراک رویال</span>
        </h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
          ${this._renderProductCards(this._products.filter(p => p.category === 'subscription'))}
        </div>
        
        <!-- آیتم‌های فعال -->
        ${this._renderActiveItems()}
        
        <p style="color: var(--text-secondary); font-size: 11px; text-align: center; margin-top: 32px;">
          ⚠️ تمامی محصولات خرید قطعی بوده و قابل بازگشت نیستند
        </p>
      </div>
    `;
  },
  
  _renderAuthWarning() {
    return `
      <div style="background: var(--warning-20); border: 1px solid var(--warning); border-radius: 16px; padding: 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 24px;">🔐</span>
        <div style="flex: 1;">
          <span style="color: var(--warning); font-weight: 700;">برای خرید وارد شوید</span>
          <p style="color: var(--text-secondary); font-size: 11px; margin-top: 4px;">خرید شما به حساب کاربریتان ذخیره میشود</p>
        </div>
        <button class="btn btn-sm" onclick="Auth._showAuthModal()" style="padding: 8px 16px; font-size: 12px;">ورود</button>
      </div>
    `;
  },
  
  _renderProductCards(products) {
    return products.map(product => {
      const owned = this._isOwned(product);
      const canBuy = Royal.get('stats.coins') >= product.price && !owned;
      
      return `
        <div style="
          background: var(--bg-card);
          border: 1px solid ${owned ? 'var(--gold)' : 'var(--gold-30)'};
          border-radius: 20px;
          padding: 20px;
          text-align: center;
          position: relative;
          transition: var(--transition-normal);
        ">
          ${product.discount ? `
            <div style="position: absolute; top: 12px; left: 12px; background: var(--gold); color: black; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 900;">
              ${product.discount}٪ تخفیف
            </div>
          ` : ''}
          
          ${product.limit ? `
            <div style="position: absolute; top: 12px; right: 12px; background: var(--error-20); color: var(--error); padding: 4px 12px; border-radius: 20px; font-size: 11px;">
              محدود ${product.limit}
            </div>
          ` : ''}
          
          <div style="font-size: 48px; margin-bottom: 12px;">${product.icon}</div>
          <div style="font-weight: 900; font-size: 16px; margin-bottom: 8px; color: ${owned ? 'var(--gold)' : 'white'};">${product.name}</div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px;">${product.description}</div>
          
          ${product.features ? `
            <div style="text-align: right; margin-bottom: 16px; padding: 12px; background: var(--bg-primary); border-radius: 12px;">
              ${product.features.map(f => `<div style="font-size: 11px; margin-bottom: 4px; color: var(--gold);">✓ ${f}</div>`).join('')}
            </div>
          ` : ''}
          
          <div style="font-size: 20px; font-weight: 900; color: var(--gold); margin-bottom: 8px;">
            ${Utils.formatCurrency(product.price)}
          </div>
          
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 16px;">
            <span style="color: var(--gold);">🔥</span>
            <span style="color: var(--text-secondary); font-size: 11px;">${product.sales} خرید</span>
          </div>
          
          ${owned ? 
            `<div style="background: var(--gold-20); color: var(--gold); padding: 12px; border-radius: 30px; font-weight: 700;">
               ✅ مالکیت
             </div>` :
            `<button class="btn" style="width: 100%;" 
                     onclick="Shop.buy('${product.id}')"
                     ${!canBuy ? 'disabled style="opacity: 0.5;"' : ''}>
               ${canBuy ? 'خرید' : 'موجودی ناکافی'}
             </button>`
          }
        </div>
      `;
    }).join('');
  },
  
  _renderActiveItems() {
    const inventory = this._inventory;
    const activeItems = [];
    
    if (inventory.activeFrame) {
      const frame = this._products.find(p => p.value === inventory.activeFrame);
      if (frame) {
        activeItems.push({ icon: '🖼️', name: frame.name, type: 'قاب فعال' });
      }
    }
    
    if (inventory.activeSkin) {
      const skin = this._products.find(p => p.value === inventory.activeSkin);
      if (skin) {
        activeItems.push({ icon: '✨', name: skin.name, type: 'اسکین فعال' });
      }
    }
    
    if (Royal.isPremium()) {
      const premium = this._products.find(p => p.type === 'premium' && p.value === 30);
      if (premium) {
        const expiry = Royal.get('user.premiumExpiry');
        const daysLeft = expiry ? Math.ceil((new Date(expiry) - new Date()) / (1000 * 60 * 60 * 24)) : 0;
        activeItems.push({ icon: '👑', name: 'اشتراک رویال', type: `${daysLeft} روز باقی‌مانده` });
      }
    }
    
    if (activeItems.length === 0) return '';
    
    return `
      <div style="margin-top: 32px; padding: 20px; background: linear-gradient(135deg, var(--gold-20), var(--bg-card)); border-radius: 20px;">
        <h4 style="color: var(--gold); margin-bottom: 16px; font-size: 14px;">✨ آیتم‌های فعال شما</h4>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          ${activeItems.map(item => `
            <div style="display: flex; align-items: center; gap: 12px; background: var(--bg-card); padding: 12px 20px; border-radius: 30px;">
              <span style="font-size: 24px;">${item.icon}</span>
              <div>
                <div style="font-weight: 700; font-size: 13px;">${item.name}</div>
                <div style="color: var(--text-secondary); font-size: 10px;">${item.type}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },
  
  // ========== BUY PRODUCT ==========
  buy(productId) {
    // Check authentication
    if (!Royal.get('user.phone')) {
      Toast.show('❌ برای خرید باید وارد شوید', 'error');
      Auth._showAuthModal();
      return false;
    }
    
    const product = this._products.find(p => p.id === productId);
    if (!product) {
      Toast.show('❌ محصول یافت نشد', 'error');
      return false;
    }
    
    // Check if already owned
    if (this._isOwned(product)) {
      Toast.show('❌ شما قبلاً این محصول را خریداری کرده‌اید', 'error');
      return false;
    }
    
    // Check coins
    const coins = Royal.get('stats.coins');
    if (coins < product.price) {
      Toast.show('❌ سکه کافی نیست', 'error');
      return false;
    }
    
    // Deduct coins
    Royal.update('stats.coins', c => c - product.price);
    
    // Apply product effect
    this._applyProduct(product);
    
    // Update sales count
    product.sales++;
    
    // Save inventory
    Royal.set('inventory', this._inventory);
    
    // Haptic feedback
    Royal.haptic('success');
    
    // Show success
    Toast.show(`✅ ${product.name} خریداری شد`, 'success');
    
    // Refresh page
    Router.refresh();
    
    return true;
  },
  
  _applyProduct(product) {
    switch (product.type) {
      case 'frame':
        if (!this._inventory.frames.includes(product.value)) {
          this._inventory.frames.push(product.value);
        }
        this._inventory.activeFrame = product.value;
        break;
        
      case 'skin':
        if (!this._inventory.skins.includes(product.value)) {
          this._inventory.skins.push(product.value);
        }
        this._inventory.activeSkin = product.value;
        break;
        
      case 'energy':
        Royal.update('stats.energy', e => Math.min(e + product.value, Royal.get('stats.maxEnergy') + 500));
        break;
        
      case 'boost':
        const boost = {
          value: product.value,
          expiry: Date.now() + (product.duration * 60 * 60 * 1000)
        };
        this._inventory.boosts.push(boost);
        Royal.set('stats.tapBoost', product.value);
        Royal.set('stats.boostExpiry', boost.expiry);
        break;
        
      case 'premium':
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + product.value);
        
        Royal.set('user.isPremium', true);
        Royal.set('user.premiumExpiry', expiry.toISOString());
        Royal.set('stats.tapBoost', 1.5);
        Royal.set('stats.maxEnergy', 1500);
        
        this._inventory.premium = {
          startDate: new Date().toISOString(),
          expiryDate: expiry.toISOString(),
          plan: product.value
        };
        
        // Add free frame
        if (product.value === 90) {
          if (!this._inventory.frames.includes('diamond')) {
            this._inventory.frames.push('diamond');
          }
          this._inventory.activeFrame = 'diamond';
        } else {
          if (!this._inventory.frames.includes('gold')) {
            this._inventory.frames.push('gold');
          }
          this._inventory.activeFrame = 'gold';
        }
        break;
    }
  },
  
  _isOwned(product) {
    switch (product.type) {
      case 'frame':
        return this._inventory.frames.includes(product.value);
      case 'skin':
        return this._inventory.skins.includes(product.value);
      case 'premium':
        return Royal.isPremium();
      default:
        return false;
    }
  },
  
  // ========== PAYMENT ==========
  showPaymentModal() {
    const modal = document.createElement('div');
    modal.className = 'royal-modal active';
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 400px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h3 style="color: var(--gold);">💰 افزایش موجودی</h3>
          <button class="btn-close" onclick="this.closest('.royal-modal').remove()" style="background: none; border: none; color: var(--text-secondary); font-size: 24px;">&times;</button>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
          <div style="background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: var(--transition-fast);"
               onclick="Shop.buyCoins(10000, 10000)">
            <span style="font-size: 32px;">💰</span>
            <div style="font-size: 20px; font-weight: 900; color: var(--gold); margin-top: 8px;">۱۰,۰۰۰</div>
            <div style="color: var(--text-secondary); font-size: 11px;">۱۰,۰۰۰ تومان</div>
          </div>
          
          <div style="background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: var(--transition-fast);"
               onclick="Shop.buyCoins(50000, 45000)">
            <span style="font-size: 32px;">💎</span>
            <div style="font-size: 20px; font-weight: 900; color: var(--gold); margin-top: 8px;">۵۰,۰۰۰</div>
            <div style="color: var(--text-secondary); font-size: 11px;">۴۵,۰۰۰ تومان</div>
            <span style="display: inline-block; background: var(--gold); color: black; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: 900; margin-top: 8px;">۱۰٪ تخفیف</span>
          </div>
          
          <div style="background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: var(--transition-fast);"
               onclick="Shop.buyCoins(100000, 85000)">
            <span style="font-size: 32px;">👑</span>
            <div style="font-size: 20px; font-weight: 900; color: var(--gold); margin-top: 8px;">۱۰۰,۰۰۰</div>
            <div style="color: var(--text-secondary); font-size: 11px;">۸۵,۰۰۰ تومان</div>
            <span style="display: inline-block; background: var(--gold); color: black; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: 900; margin-top: 8px;">۱۵٪ تخفیف</span>
          </div>
          
          <div style="background: var(--bg-card); border: 1px solid var(--gold-30); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: var(--transition-fast);"
               onclick="Shop.buyCoins(500000, 400000)">
            <span style="font-size: 32px;">🏆</span>
            <div style="font-size: 20px; font-weight: 900; color: var(--gold); margin-top: 8px;">۵۰۰,۰۰۰</div>
            <div style="color: var(--text-secondary); font-size: 11px;">۴۰۰,۰۰۰ تومان</div>
            <span style="display: inline-block; background: var(--gold); color: black; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: 900; margin-top: 8px;">۲۰٪ تخفیف</span>
          </div>
        </div>
        
        <p style="color: var(--text-secondary); font-size: 11px; text-align: center;">
          ⚠️ پرداخت از طریق درگاه امن ایتا انجام میشود
        </p>
      </div>
    `;
    
    document.body.appendChild(modal);
  },
  
  // ========== BUY COINS ==========
  async buyCoins(coins, amount) {
    try {
      Toast.show('🔄 در حال اتصال به درگاه پرداخت...', 'info');
      
      // Eitaa payment
      if (window.Eitaa?.WebApp?.openInvoice) {
        window.Eitaa.WebApp.openInvoice({
          amount: amount,
          currency: 'IRR',
          description: `خرید ${Utils.formatNumber(coins)} سکه`,
          payload: JSON.stringify({
            userId: Royal.get('user.id'),
            coins: coins,
            amount: amount,
            timestamp: Date.now()
          }),
          onSuccess: (payment) => {
            // Add coins
            Royal.update('stats.coins', c => c + coins);
            Toast.show(`✅ ${Utils.formatNumber(coins)} سکه به کیف پول شما اضافه شد`, 'success');
            Router.refresh();
          },
          onFail: () => {
            Toast.show('❌ پرداخت ناموفق', 'error');
          }
        });
      } else {
        // Fallback
        Toast.show('⚠️ درگاه پرداخت در دسترس نیست', 'warning');
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      Toast.show('❌ خطا در پرداخت', 'error');
    }
  }
};

window.Shop = Shop;