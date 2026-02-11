/* ===========================================
   CORE EVENTS - سیستم رویداد
   نسخه: 2.0.0
   تغییر: ❌ ممنوع - دست نزنید
=========================================== */

const Events = {
  _events: new Map(),
  _onceEvents: new Set(),
  
  // ========== ON ==========
  on(event, callback) {
    if (!this._events.has(event)) {
      this._events.set(event, []);
    }
    this._events.get(event).push(callback);
    
    // Return unsubscribe function
    return () => this.off(event, callback);
  },
  
  // ========== ONCE ==========
  once(event, callback) {
    const wrapper = (data) => {
      this.off(event, wrapper);
      callback(data);
    };
    this._onceEvents.add(wrapper);
    this.on(event, wrapper);
  },
  
  // ========== OFF ==========
  off(event, callback) {
    if (!this._events.has(event)) return;
    
    const callbacks = this._events.get(event);
    const index = callbacks.indexOf(callback);
    
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
    
    if (callbacks.length === 0) {
      this._events.delete(event);
    }
  },
  
  // ========== EMIT ==========
  emit(event, data) {
    if (!this._events.has(event)) return;
    
    const callbacks = this._events.get(event);
    callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`❌ Error in event ${event}:`, error);
      }
    });
  },
  
  // ========== EMIT ASYNC ==========
  async emitAsync(event, data) {
    if (!this._events.has(event)) return;
    
    const callbacks = this._events.get(event);
    for (const callback of callbacks) {
      try {
        await callback(data);
      } catch (error) {
        console.error(`❌ Error in event ${event}:`, error);
      }
    }
  },
  
  // ========== CLEAR ==========
  clear(event) {
    if (event) {
      this._events.delete(event);
    } else {
      this._events.clear();
    }
  },
  
  // ========== LISTENERS ==========
  listeners(event) {
    return this._events.get(event)?.length || 0;
  },
  
  // ========== EVENT NAMES ==========
  eventNames() {
    return Array.from(this._events.keys());
  }
};

window.Events = Events;