/* ===========================================
   CORE UTILS - توابع کمکی
   نسخه: 2.0.0
   تغییر: ❌ ممنوع - دست نزنید
=========================================== */

const Utils = {
  // ========== NUMBER FORMATTING ==========
  formatNumber(num) {
    if (num === null || num === undefined) return '۰';
    return num.toLocaleString('fa-IR');
  },
  
  formatCurrency(amount) {
    return `${this.formatNumber(amount)} تومان`;
  },
  
  formatPercentage(value, total) {
    if (total === 0) return '۰٪';
    return `${Math.round((value / total) * 100)}٪`;
  },
  
  // ========== DATE & TIME ==========
  getPersianDate(date = new Date()) {
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
  
  getPersianTime(date = new Date()) {
    return date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds} ثانیه پیش`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} دقیقه پیش`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ساعت پیش`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} روز پیش`;
    
    return this.getPersianDate(new Date(timestamp));
  },
  
  // ========== STRING UTILS ==========
  truncate(str, length = 50) {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  },
  
  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },
  
  slugify(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9آ-ی]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  },
  
  // ========== VALIDATION ==========
  isValidPhone(phone) {
    return /^09[0-9]{9}$/.test(phone);
  },
  
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  
  // ========== RANDOM ==========
  randomId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },
  
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  // ========== ARRAY UTILS ==========
  groupBy(array, key) {
    return array.reduce((result, item) => {
      const group = item[key];
      if (!result[group]) result[group] = [];
      result[group].push(item);
      return result;
    }, {});
  },
  
  sortBy(array, key, order = 'asc') {
    return [...array].sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
  },
  
  // ========== STORAGE ==========
  async setItem(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (e) {
      console.error('❌ Storage set error:', e);
      return false;
    }
  },
  
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('❌ Storage get error:', e);
      return defaultValue;
    }
  },
  
  // ========== DEBOUNCE ==========
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // ========== THROTTLE ==========
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // ========== RANK EMOJI ==========
  getRankEmoji(rank) {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}.`;
    }
  },
  
  // ========== TEAM LOGO ==========
  getTeamLogo(teamName) {
    const logos = {
      'تراکتور': '🔴',
      'پرسپولیس': '🔴',
      'استقلال': '🔵',
      'سپاهان': '🟡🔴',
      'گل‌گهر': '🟢',
      'فولاد': '🟡',
      'ذوب‌آهن': '🟢',
      'مس رفسنجان': '🟢',
      'آلومینیوم': '⚪',
      'نساجی': '🟠',
      'صنعت نفت': '🟤',
      'نفت مسجدسلیمان': '⚫',
      'پیکان': '🔵⚪',
      'خیبر': '🟢⚪',
      'فجر سپاسی': '🔴⚪',
      'شمس آذر': '🔵🟡',
      'چادرملو': '🟡🔵',
      'هوادار': '🟣'
    };
    
    return logos[teamName] || '⚽';
  },
  
  // ========== COLOR UTILS ==========
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },
  
  // ========== COPY TO CLIPBOARD ==========
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      console.error('❌ Copy error:', e);
      return false;
    }
  },
  
  // ========== SLEEP ==========
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

window.Utils = Utils;