/* ===========================================
   MODULE: CHAT - چت رویال با احراز هویت
   نسخه: 2.0.0
   وضعیت: ✅ مستقل - real-time با Firebase
=========================================== */

const Chat = {
  // ========== STATE ==========
  _messages: [],
  _onlineUsers: 0,
  _typingUsers: [],
  _lastMessageId: null,
  _unsubscribe: null,
  
  // ========== INITIALIZE ==========
  async init() {
    // Load messages from Firebase
    await this._loadMessages();
    
    // Subscribe to real-time updates
    this._subscribeToMessages();
    
    // Subscribe to online users
    this._subscribeToPresence();
    
    // Register page
    Router.register('chat', () => this.render());
    
    console.log('✅ Chat module initialized');
  },
  
  // ========== RENDER ==========
  render() {
    const user = Royal.get('user');
    const isAuthenticated = user.phone && user.gender;
    
    return `
      <div class="royal-card" style="padding: 0; overflow: hidden;">
        <div style="background: linear-gradient(135deg, var(--gold-20), var(--bg-card)); padding: 20px; border-bottom: 1px solid var(--gold-30);">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--gold), var(--gold-dark)); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 32px;">
              💬
            </div>
            <div>
              <div style="font-size: 20px; font-weight: 900; color: var(--gold);">چت رویال</div>
              <div style="display: flex; gap: 20px; margin-top: 4px;">
                <span style="color: var(--text-secondary); font-size: 12px;">
                  👥 ${this._onlineUsers} کاربر آنلاین
                </span>
                <span style="color: var(--success); font-size: 12px;">
                  ● ${this._typingUsers.length} در حال چت
                </span>
              </div>
            </div>
          </div>
        </div>
        
        ${!isAuthenticated ? this._renderAuthRequired() : this._renderChat()}
      </div>
    `;
  },
  
  _renderAuthRequired() {
    return `
      <div style="text-align: center; padding: 60px 20px;">
        <span style="font-size: 64px;">🔐</span>
        <h3 style="margin: 20px 0; color: var(--gold);">ورود به چت</h3>
        <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 14px;">
          برای استفاده از چت باید با شماره موبایل وارد شوید و جنسیت خود را انتخاب کنید
        </p>
        <button class="btn" onclick="Auth._showAuthModal()" style="padding: 16px 40px;">
          ورود به چت
        </button>
      </div>
    `;
  },
  
  _renderChat() {
    return `
      <div style="display: flex; flex-direction: column; height: 500px;">
        <!-- Messages -->
        <div id="chatMessages" style="flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
          ${this._renderMessages()}
        </div>
        
        <!-- Input -->
        <div style="padding: 20px; background: var(--bg-card); border-top: 1px solid var(--gold-30);">
          <div style="display: flex; gap: 12px;">
            <input type="text" 
                   id="chatInput" 
                   placeholder="پیام خود را بنویسید..."
                   style="flex: 1; padding: 16px 20px; background: var(--bg-primary); border: 1px solid var(--gold-30); border-radius: 30px; color: white; font-size: 14px;"
                   onkeypress="if(event.key === 'Enter') Chat.sendMessage()"
                   oninput="Chat.startTyping()">
            <button class="btn" style="width: 60px; height: 60px; padding: 0; border-radius: 50%; font-size: 24px;" onclick="Chat.sendMessage()">
              ➤
            </button>
          </div>
          
          <!-- Typing indicator -->
          <div id="typingIndicator" style="margin-top: 8px; color: var(--text-secondary); font-size: 11px; height: 20px;">
            ${this._renderTypingIndicator()}
          </div>
        </div>
      </div>
    `;
  },
  
  _renderMessages() {
    if (this._messages.length === 0) {
      return `
        <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
          <span style="font-size: 48px;">💭</span>
          <p style="margin-top: 16px;">اولین پیام را شما بنویسید!</p>
        </div>
      `;
    }
    
    return this._messages.map(msg => this._renderMessage(msg)).join('');
  },
  
  _renderMessage(msg) {
    const isOwn = msg.userId === Royal.get('user.id');
    const gender = msg.gender || 'male';
    const genderColor = gender === 'female' ? 'var(--pink)' : 'var(--blue)';
    const genderIcon = gender === 'female' ? '👩' : '👨';
    
    return `
      <div style="display: flex; gap: 12px; ${isOwn ? 'flex-direction: row-reverse;' : ''} margin-bottom: 8px;">
        ${!isOwn ? `
          <div style="width: 45px; height: 45px; background: ${genderColor}; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0;">
            ${genderIcon}
          </div>
        ` : ''}
        
        <div style="max-width: 70%; ${isOwn ? 'margin-left: auto;' : ''}">
          <div style="
            background: ${isOwn ? 'var(--gold-20)' : 'var(--bg-card)'};
            border: 1px solid ${isOwn ? 'var(--gold)' : 'var(--gold-30)'};
            border-radius: ${isOwn ? '20px 20px 4px 20px' : '20px 20px 20px 4px'};
            padding: 16px 20px;
          ">
            ${!isOwn ? `
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="font-weight: 900; color: ${genderColor};">${msg.userName}</span>
                <span style="color: var(--text-secondary); font-size: 11px;">
                  ${gender === 'female' ? 'خانم' : 'آقا'}
                </span>
                ${msg.isPremium ? '<span style="color: var(--gold); font-size: 12px;">👑</span>' : ''}
              </div>
            ` : ''}
            
            <div style="color: ${isOwn ? 'var(--gold)' : 'white'}; word-break: break-word; font-size: 14px; line-height: 1.6;">
              ${Utils.escapeHTML(msg.text)}
            </div>
            
            <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
              <span style="color: var(--text-secondary); font-size: 10px;">
                ${Utils.timeAgo(msg.timestamp)}
              </span>
            </div>
          </div>
        </div>
        
        ${isOwn ? `
          <div style="width: 45px; height: 45px; background: ${genderColor}; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0;">
            ${genderIcon}
          </div>
        ` : ''}
      </div>
    `;
  },
  
  _renderTypingIndicator() {
    if (this._typingUsers.length === 0) return '';
    
    const names = this._typingUsers
      .filter(u => u !== Royal.get('user.id'))
      .map(id => {
        const msg = this._messages.find(m => m.userId === id);
        return msg ? msg.userName : 'کاربر';
      });
    
    if (names.length === 0) return '';
    
    if (names.length === 1) {
      return `${names[0]} در حال نوشتن...`;
    } else if (names.length === 2) {
      return `${names[0]} و ${names[1]} در حال نوشتن...`;
    } else {
      return `${names.length} نفر در حال نوشتن...`;
    }
  },
  
  // ========== SEND MESSAGE ==========
  async sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    // Check authentication
    const user = Royal.get('user');
    if (!user.phone || !user.gender) {
      Toast.show('❌ برای ارسال پیام وارد شوید', 'error');
      Auth._showAuthModal();
      return;
    }
    
    // Check message length
    if (text.length > 500) {
      Toast.show('❌ پیام شما بسیار طولانی است', 'error');
      return;
    }
    
    // Create message object
    const message = {
      userId: user.id,
      userName: user.name || 'کاربر',
      gender: user.gender,
      isPremium: Royal.isPremium(),
      text: text,
      timestamp: Date.now()
    };
    
    try {
      // Send to Firebase
      if (DB) {
        await DB.sendMessage(message);
      }
      
      // Clear input
      input.value = '';
      
      // Stop typing
      this.stopTyping();
      
    } catch (error) {
      console.error('❌ Send message error:', error);
      Toast.show('❌ خطا در ارسال پیام', 'error');
    }
  },
  
  // ========== TYPING INDICATOR ==========
  startTyping() {
    const userId = Royal.get('user.id');
    if (!userId) return;
    
    // Add to typing users
    if (!this._typingUsers.includes(userId)) {
      this._typingUsers.push(userId);
      this._updateTypingIndicator();
    }
    
    // Clear after 3 seconds
    clearTimeout(this._typingTimeout);
    this._typingTimeout = setTimeout(() => {
      this.stopTyping();
    }, 3000);
  },
  
  stopTyping() {
    const userId = Royal.get('user.id');
    if (!userId) return;
    
    const index = this._typingUsers.indexOf(userId);
    if (index !== -1) {
      this._typingUsers.splice(index, 1);
      this._updateTypingIndicator();
    }
  },
  
  _updateTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
      indicator.innerHTML = this._renderTypingIndicator();
    }
  },
  
  // ========== FIREBASE SUBSCRIPTIONS ==========
  async _loadMessages() {
    try {
      if (!DB) return;
      
      const messages = await DB.getMessages(50);
      this._messages = messages.reverse();
      
      // Scroll to bottom
      setTimeout(() => {
        const container = document.getElementById('chatMessages');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 100);
      
    } catch (error) {
      console.error('❌ Load messages error:', error);
    }
  },
  
  _subscribeToMessages() {
    if (!DB) return;
    
    this._unsubscribe = DB.subscribeToChat((messages) => {
      this._messages = messages.reverse();
      
      // Update UI if on chat page
      if (Router.currentPage === 'chat') {
        const container = document.getElementById('chatMessages');
        if (container) {
          container.innerHTML = this._renderMessages();
          container.scrollTop = container.scrollHeight;
        }
      }
    });
  },
  
  _subscribeToPresence() {
    // Simulate online users
    setInterval(() => {
      this._onlineUsers = 100 + Math.floor(Math.random() * 50);
    }, 10000);
  },
  
  // ========== CLEANUP ==========
  destroy() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
};

window.Chat = Chat;