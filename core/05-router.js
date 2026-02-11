/* ===========================================
   CORE ROUTER - مدیریت صفحات
   نسخه: 2.0.0
   تغییر: ❌ ممنوع - دست نزنید
=========================================== */

const Router = {
  _pages: new Map(),
  _currentPage: null,
  _container: null,
  _history: [],
  _maxHistory: 10,
  
  // ========== REGISTER PAGE ==========
  register(path, renderFunction) {
    this._pages.set(path, renderFunction);
    return this;
  },
  
  // ========== SET CONTAINER ==========
  setContainer(selector) {
    this._container = document.querySelector(selector);
    if (!this._container) {
      console.error(`❌ Container ${selector} not found`);
    }
    return this;
  },
  
  // ========== NAVIGATION ==========
  goTo(path, data = null) {
    if (!this._pages.has(path)) {
      console.error(`❌ Page ${path} not found`);
      return false;
    }
    
    // Save to history
    if (this._currentPage) {
      this._history.push({
        path: this._currentPage,
        data: this._lastData
      });
      
      if (this._history.length > this._maxHistory) {
        this._history.shift();
      }
    }
    
    this._currentPage = path;
    this._lastData = data;
    
    this._render();
    
    // Update BackButton
    if (this._history.length > 0) {
      window.Eitaa?.WebApp?.BackButton?.show();
    } else {
      window.Eitaa?.WebApp?.BackButton?.hide();
    }
    
    Events.emit('route:change', { path, data });
    
    return true;
  },
  
  back() {
    if (this._history.length === 0) {
      window.Eitaa?.WebApp?.close();
      return false;
    }
    
    const prev = this._history.pop();
    this._currentPage = prev.path;
    this._lastData = prev.data;
    this._render();
    
    return true;
  },
  
  // ========== RENDER ==========
  _render() {
    if (!this._container) return;
    
    const renderFn = this._pages.get(this._currentPage);
    if (!renderFn) return;
    
    const html = renderFn(this._lastData);
    this._container.innerHTML = html;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    Events.emit('page:loaded', this._currentPage);
  },
  
  // ========== GETTERS ==========
  get currentPage() {
    return this._currentPage;
  },
  
  get canGoBack() {
    return this._history.length > 0;
  },
  
  // ========== REFRESH ==========
  refresh() {
    this._render();
  }
};

window.Router = Router;