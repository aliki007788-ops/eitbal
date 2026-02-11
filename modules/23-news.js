/* ===========================================
   MODULE: NEWS - خبرخوان هوشمند فوتبال
   نسخه: 2.0.0
   وضعیت: ✅ مستقل - RSS Aggregator
=========================================== */

const News = {
  // ========== RSS SOURCES ==========
  _sources: [
    {
      id: 'varzesh3',
      name: 'ورزش سه',
      icon: '🟢',
      url: 'https://www.varzesh3.com/rss/latest',
      category: 'general',
      enabled: true
    },
    {
      id: 'mehr',
      name: 'خبرگزاری مهر',
      icon: '🔵',
      url: 'https://www.mehrnews.com/rss/sport',
      category: 'agency',
      enabled: true
    },
    {
      id: 'tasnim',
      name: 'تسنیم',
      icon: '🟡',
      url: 'https://www.tasnimnews.com/fa/rss/sport',
      category: 'agency',
      enabled: true
    },
    {
      id: 'fars',
      name: 'فارس',
      icon: '🔴',
      url: 'https://www.farsnews.ir/rss/sport',
      category: 'agency',
      enabled: true
    },
    {
      id: 'football360',
      name: 'فوتبال ۳۶۰',
      icon: '🟠',
      url: 'https://football360.ir/rss',
      category: 'specialized',
      enabled: true
    },
    {
      id: 'iranvarzeshi',
      name: 'ایران ورزشی',
      icon: '⚪',
      url: 'https://iranvarzeshi.ir/rss',
      category: 'newspaper',
      enabled: true
    }
  ],
  
  // ========== NEWS DATA ==========
  _news: [
    {
      id: 1,
      source: 'ورزش سه',
      sourceIcon: '🟢',
      title: 'علیرضا بیرانوند: با تراکتور قهرمان رویال میشویم / پیشنهاد قطری داشتم اما ماندم',
      summary: 'دروازه‌بان تیم تراکتور گفت: از هواداران این تیم تشکر می‌کنم و تمام تلاشم را برای قهرمانی میکنم.',
      time: '۲ دقیقه پیش',
      timestamp: Date.now() - 120000,
      views: 3241,
      comments: 42,
      likes: 215,
      category: 'تراکتور',
      image: 'https://example.com/beiranvand.jpg',
      url: 'https://varzesh3.com/news/123456'
    },
    {
      id: 2,
      source: 'خبرگزاری مهر',
      sourceIcon: '🔵',
      title: 'اعلام برنامه هفته نوزدهم لیگ برتر؛ شهرآورد تهران ۸ اسفند برگزار میشود',
      summary: 'سازمان لیگ فوتبال ایران، برنامه کامل هفته نوزدهم لیگ برتر را اعلام کرد. دیدار سنتی پرسپولیس و استقلال ۸ اسفند برگزار خواهد شد.',
      time: '۷ دقیقه پیش',
      timestamp: Date.now() - 420000,
      views: 1890,
      comments: 23,
      likes: 98,
      category: 'لیگ برتر',
      url: 'https://mehrnews.com/news/654321'
    },
    {
      id: 3,
      source: 'فوتبال ۳۶۰',
      sourceIcon: '🟠',
      title: 'سا پینتو: استقلال برای قهرمانی می‌جنگد / سه امتیاز بازی با چادرملو حیاتی است',
      summary: 'سرمربی پرتغالی استقلال تأکید کرد که تیمش تا آخرین لحظه برای قهرمانی می‌جنگد.',
      time: '۱۵ دقیقه پیش',
      timestamp: Date.now() - 900000,
      views: 2567,
      comments: 89,
      likes: 312,
      category: 'استقلال',
      url: 'https://football360.ir/news/789012'
    },
    {
      id: 4,
      source: 'تسنیم',
      sourceIcon: '🟡',
      title: 'دراگان اسکوچیچ: هواداران تراکتور رویال هستند / برای قهرمانی می‌جنگیم',
      summary: 'سرمربی کروات تراکتور گفت: هواداران تراکتور یکی از بهترین هواداران آسیا هستند.',
      time: '۲۲ دقیقه پیش',
      timestamp: Date.now() - 1320000,
      views: 1934,
      comments: 56,
      likes: 178,
      category: 'تراکتور',
      url: 'https://tasnimnews.com/news/345678'
    },
    {
      id: 5,
      source: 'ورزش سه',
      sourceIcon: '🟢',
      title: 'جدول گلزنان لیگ برتر؛ حسین‌زاده در صدر، طارمی و آزمون در تعقیب',
      summary: 'امیرحسین حسین‌زاده از تراکتور با ۱۲ گل صدرنشین جدول گلزنان لیگ برتر است.',
      time: '۳۱ دقیقه پیش',
      timestamp: Date.now() - 1860000,
      views: 876,
      comments: 34,
      likes: 67,
      category: 'آمار',
      url: 'https://varzesh3.com/news/901234'
    },
    {
      id: 6,
      source: 'فارس',
      sourceIcon: '🔴',
      title: 'باشگاه پرسپولیس: بدهی برانکو ایوانکوویچ تسویه شد',
      summary: 'مدیرعامل باشگاه پرسپولیس اعلام کرد که تمامی بدهی‌های برانکو ایوانکوویچ پرداخت شده است.',
      time: '۴۵ دقیقه پیش',
      timestamp: Date.now() - 2700000,
      views: 4123,
      comments: 156,
      likes: 523,
      category: 'پرسپولیس',
      url: 'https://farsnews.ir/news/567890'
    }
  ],
  
  _categories: ['همه', 'پرسپولیس', 'استقلال', 'تراکتور', 'سپاهان', 'لیگ برتر', 'تیم ملی', 'آمار'],
  _selectedCategory: 'همه',
  _unsubscribe: null,
  
  // ========== INITIALIZE ==========
  init() {
    // Register page
    Router.register('news', () => this.render());
    
    // Subscribe to real-time updates
    this._subscribeToUpdates();
    
    // Start sync
    this._startSync();
    
    console.log('✅ News module initialized');
  },
  
  // ========== RENDER ==========
  render() {
    const filteredNews = this._selectedCategory === 'همه' 
      ? this._news 
      : this._news.filter(n => n.category === this._selectedCategory);
    
    return `
      <div class="royal-card">
        <div class="card-title">
          <span class="card-title-icon">📰</span>
          <span>خبرخوان رویال</span>
          <span style="margin-right: auto; background: var(--gold-20); color: var(--gold); padding: 4px 12px; border-radius: 20px; font-size: 11px;">
            ${this._sources.length} منبع
          </span>
        </div>
        
        <!-- Categories -->
        <div style="display: flex; overflow-x: auto; gap: 12px; margin-bottom: 24px; padding-bottom: 8px;">
          ${this._categories.map(cat => `
            <button class="btn btn-sm ${this._selectedCategory === cat ? '' : 'btn-outline'}" 
                    style="padding: 8px 16px; flex-shrink: 0;"
                    onclick="News.filterByCategory('${cat}')">
              ${cat}
            </button>
          `).join('')}
        </div>
        
        <!-- Breaking News -->
        ${this._renderBreakingNews()}
        
        <!-- News Grid -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${filteredNews.map(item => this._renderNewsCard(item)).join('')}
        </div>
        
        <!-- Load More -->
        <div style="text-align: center; margin-top: 24px;">
          <button class="btn btn-outline" onclick="News.loadMore()" style="padding: 12px 40px;">
            اخبار بیشتر
          </button>
        </div>
        
        <!-- Sources -->
        <div style="margin-top: 32px; padding: 20px; background: var(--bg-card); border-radius: 20px;">
          <h4 style="color: var(--gold); margin-bottom: 16px; font-size: 14px;">📡 منابع خبری</h4>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
            ${this._sources.map(source => `
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;">${source.icon}</span>
                <div>
                  <div style="font-size: 12px; font-weight: 700;">${source.name}</div>
                  <div style="font-size: 10px; color: var(--text-secondary);">${source.category === 'general' ? 'عمومی' : source.category === 'agency' ? 'خبرگزاری' : 'تخصصی'}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },
  
  _renderBreakingNews() {
    const breaking = this._news.slice(0, 1)[0];
    if (!breaking) return '';
    
    return `
      <div style="background: linear-gradient(135deg, var(--error-20), var(--bg-card)); border: 1px solid var(--error); border-radius: 20px; padding: 20px; margin-bottom: 24px; display: flex; align-items: center; gap: 16px;">
        <div style="background: var(--error); border-radius: 12px; padding: 8px 16px; color: white; font-size: 12px; font-weight: 900; animation: pulse 2s infinite;">
          🔴 فوری
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span>${breaking.sourceIcon}</span>
            <span style="font-size: 12px; color: var(--text-secondary);">${breaking.source}</span>
            <span style="font-size: 11px; color: var(--error);">${breaking.time}</span>
          </div>
          <div style="font-weight: 900; font-size: 15px;">${breaking.title}</div>
        </div>
      </div>
    `;
  },
  
  _renderNewsCard(item) {
    return `
      <div style="display: flex; gap: 16px; padding: 20px; background: var(--bg-card); border: 1px solid var(--gold-20); border-radius: 20px; transition: var(--transition-fast); cursor: pointer;"
           onclick="News.openArticle('${item.url}')">
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--gold-20), var(--bg-primary)); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 36px; flex-shrink: 0;">
          ${item.sourceIcon}
        </div>
        
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <span style="font-weight: 700; color: var(--gold);">${item.source}</span>
            <span style="font-size: 11px; color: var(--text-secondary);">${item.time}</span>
            <span style="background: ${item.category === 'فوری' ? 'var(--error)' : 'var(--gold-20)'}; color: ${item.category === 'فوری' ? 'white' : 'var(--gold)'}; padding: 4px 12px; border-radius: 20px; font-size: 10px;">
              ${item.category}
            </span>
          </div>
          
          <div style="font-weight: 900; font-size: 15px; margin-bottom: 8px; line-height: 1.6;">
            ${item.title}
          </div>
          
          <div style="color: var(--text-secondary); font-size: 13px; margin-bottom: 12px; line-height: 1.6;">
            ${item.summary}
          </div>
          
          <div style="display: flex; align-items: center; gap: 20px;">
            <span style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-secondary);">
              <span>👁️</span>
              ${Utils.formatNumber(item.views)}
            </span>
            <span style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-secondary);">
              <span>💬</span>
              ${item.comments}
            </span>
            <span style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-secondary);">
              <span>❤️</span>
              ${item.likes}
            </span>
          </div>
        </div>
      </div>
    `;
  },
  
  // ========== ACTIONS ==========
  filterByCategory(category) {
    this._selectedCategory = category;
    Router.refresh();
  },
  
  openArticle(url) {
    if (window.Eitaa?.WebApp?.openLink) {
      window.Eitaa.WebApp.openLink(url);
    } else {
      window.open(url, '_blank');
    }
  },
  
  // ========== SYNC WITH RSS ==========
  _startSync() {
    // Sync every minute
    setInterval(async () => {
      await this._syncRSSFeeds();
    }, 60000);
  },
  
  async _syncRSSFeeds() {
    try {
      // In production: fetch from actual RSS feeds
      // for (const source of this._sources) {
      //   const items = await HTTP.parseRSS(source.url);
      //   // Process items...
      // }
      
      console.log('🔄 RSS feeds synced');
      
      // Refresh if on news page
      if (Router.currentPage === 'news') {
        Router.refresh();
      }
    } catch (error) {
      console.error('❌ RSS sync error:', error);
    }
  },
  
  _subscribeToUpdates() {
    if (!DB) return;
    
    this._unsubscribe = DB.subscribeToNews((data) => {
      if (data && data.length > 0) {
        this._news = [...data, ...this._news].slice(0, 50);
        
        if (Router.currentPage === 'news') {
          Router.refresh();
        }
      }
    });
  },
  
  // ========== LOAD MORE ==========
  loadMore() {
    Toast.show('🔄 در حال بارگذاری اخبار بیشتر...', 'info');
    
    // Simulate loading more
    setTimeout(() => {
      const newNews = [
        {
          id: Date.now(),
          source: 'ایران ورزشی',
          sourceIcon: '⚪',
          title: 'نگاهی به عملکرد تیم‌های لیگ برتری در هفته هجدهم',
          summary: 'تیم‌های تراکتور، سپاهان و پرسپولیس در هفته هجدهم لیگ برتر به پیروزی رسیدند.',
          time: '۱ ساعت پیش',
          timestamp: Date.now() - 3600000,
          views: 543,
          comments: 12,
          likes: 34,
          category: 'لیگ برتر',
          url: '#'
        }
      ];
      
      this._news = [...this._news, ...newNews];
      Router.refresh();
      Toast.show('✅ اخبار جدید بارگذاری شد', 'success');
    }, 1500);
  }
};

window.News = News;