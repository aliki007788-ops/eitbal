  // ========== AUTHENTICATION ==========
  async _initAuth() {
    // Check for test user from index.html first
    const testUser = localStorage.getItem('eitabal_user');
    if (testUser) {
      const userData = JSON.parse(testUser);
      this._state.user.id = userData.id;
      this._state.user.phone = userData.phone;
      this._state.user.name = userData.name;
      this._state.user.gender = userData.gender;
      this._state.user.avatar = userData.gender === 'female' ? '👩' : '👨';
      this._state.user.joinDate = userData.joinDate;
      this._state.user.isPremium = userData.isPremium || false;
      
      console.log('✅ User authenticated from localStorage:', this._state.user.name);
      return true;
    }
    
    // Fallback to Eitaa SDK
    const eitaaUser = window.Eitaa?.WebApp?.initDataUnsafe?.user;
    
    if (eitaaUser) {
      this._state.user.id = `eitaa_${eitaaUser.id}`;
      this._state.user.phone = eitaaUser.phone_number || null;
      this._state.user.name = eitaaUser.first_name || 'کاربر';
      
      const savedGender = localStorage.getItem('eitabal_gender');
      if (savedGender) {
        this._state.user.gender = savedGender;
      }
      
      console.log('✅ User authenticated:', this._state.user.name);
      return true;
    }
    
    console.warn('⚠️ User not authenticated');
    return false;
  },
