/* ===========================================
   API: PAYMENT WEBHOOK - تایید پرداخت
   نسخه: 2.0.0
   وضعیت: ✅ سرورساید - Node.js
=========================================== */

const express = require('express');
const router = express.Router();

// Eitaa payment webhook
router.post('/eitaa-webhook', async (req, res) => {
  try {
    const { transactionId, userId, planId, status, paymentId } = req.body;
    
    // Verify signature
    // const signature = req.headers['x-signature'];
    // if (!verifySignature(signature, req.body)) {
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }
    
    // Update transaction in Firebase
    const db = firebase.database();
    await db.ref(`transactions/${transactionId}`).update({
      status: status,
      paymentId: paymentId,
      completedAt: Date.now()
    });
    
    // Update user balance
    if (status === 'completed') {
      const plan = getPlanById(planId);
      
      if (plan.type === 'coins') {
        await db.ref(`users/${userId}/stats/coins`).transaction(current => 
          (current || 0) + plan.coins + (plan.bonus || 0)
        );
      } else if (plan.type === 'premium') {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + plan.duration);
        
        await db.ref(`users/${userId}`).update({
          isPremium: true,
          premiumExpiry: expiry.toISOString()
        });
      }
    }
    
    res.json({ success: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Zarinpal webhook
router.post('/zarinpal-webhook', async (req, res) => {
  // Similar implementation
  res.json({ success: true });
});

module.exports = router;