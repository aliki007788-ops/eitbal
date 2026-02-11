/* ===========================================
   CORE HTTP - درخواست‌های شبکه
   نسخه: 2.0.0
   تغییر: ❌ ممنوع - دست نزنید
=========================================== */

const HTTP = {
  // ========== CONFIG ==========
  _config: {
    baseURL: 'https://api.eitabal.ir',
    timeout: 30000,
    retries: 3,
    cacheTTL: 300000 // 5 minutes
  },
  
  _cache: new Map(),
  _pending: new Map(),
  
  // ========== REQUEST ==========
  async request(options) {
    const {
      url,
      method = 'GET',
      data = null,
      headers = {},
      withCredentials = false,
      cache = true,
      cacheTTL = this._config.cacheTTL
    } = options;
    
    const cacheKey = `${method}:${url}:${JSON.stringify(data)}`;
    
    // Check cache
    if (cache && method === 'GET') {
      const cached = this._getCache(cacheKey);
      if (cached) return cached;
    }
    
    // Check pending requests
    if (this._pending.has(cacheKey)) {
      return this._pending.get(cacheKey);
    }
    
    // Prepare request
    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers
      },
      withCredentials
    };
    
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
    
    // Add timeout
    const controller = new AbortController();
    requestOptions.signal = controller.signal;
    
    const timeoutId = setTimeout(() => controller.abort(), this._config.timeout);
    
    // Make request
    const requestPromise = (async () => {
      let lastError;
      
      for (let i = 0; i < this._config.retries; i++) {
        try {
          const response = await fetch(this._config.baseURL + url, requestOptions);
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const result = await response.json();
          
          // Cache result
          if (cache && method === 'GET') {
            this._setCache(cacheKey, result, cacheTTL);
          }
          
          this._pending.delete(cacheKey);
          return result;
          
        } catch (error) {
          lastError = error;
          
          // Don't retry on abort
          if (error.name === 'AbortError') {
            break;
          }
          
          // Wait before retry
          if (i < this._config.retries - 1) {
            await Utils.sleep(1000 * (i + 1));
          }
        }
      }
      
      this._pending.delete(cacheKey);
      throw lastError;
    })();
    
    this._pending.set(cacheKey, requestPromise);
    return requestPromise;
  },
  
  // ========== HTTP METHODS ==========
  get(url, options = {}) {
    return this.request({ ...options, url, method: 'GET' });
  },
  
  post(url, data, options = {}) {
    return this.request({ ...options, url, method: 'POST', data });
  },
  
  put(url, data, options = {}) {
    return this.request({ ...options, url, method: 'PUT', data });
  },
  
  patch(url, data, options = {}) {
    return this.request({ ...options, url, method: 'PATCH', data });
  },
  
  delete(url, options = {}) {
    return this.request({ ...options, url, method: 'DELETE' });
  },
  
  // ========== CACHE ==========
  _setCache(key, value, ttl) {
    this._cache.set(key, {
      value,
      expires: Date.now() + ttl
    });
  },
  
  _getCache(key) {
    const cached = this._cache.get(key);
    if (!cached) return null;
    
    if (cached.expires < Date.now()) {
      this._cache.delete(key);
      return null;
    }
    
    return cached.value;
  },
  
  clearCache() {
    this._cache.clear();
  },
  
  // ========== CORS PROXY ==========
  async proxy(url, options = {}) {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    return this.get(proxyUrl, options);
  },
  
  // ========== RSS PARSER ==========
  async parseRSS(url) {
    try {
      const xml = await this.proxy(url);
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      
      const items = Array.from(doc.querySelectorAll('item')).map(item => ({
        title: item.querySelector('title')?.textContent,
        link: item.querySelector('link')?.textContent,
        description: item.querySelector('description')?.textContent,
        pubDate: item.querySelector('pubDate')?.textContent,
        guid: item.querySelector('guid')?.textContent
      }));
      
      return items;
    } catch (error) {
      console.error('❌ RSS parse error:', error);
      return [];
    }
  }
};

window.HTTP = HTTP;