# HEARTBEAT.md

## ✅ AUTONOMOUS TRADING MODE WITH NEWS HANDLING

**DEMO ACCOUNT TRADING** - Full autonomy on account 413144197 (Exness-MT5Trial6)

When heartbeat runs, check:
1. **Economic news** - High-impact events in next 2 hours
2. **Open positions status** - P&L, near SL/TP levels  
3. **Market conditions** - Spreads, volatility, liquidity
4. **New swing setups** - Support/resistance levels
5. **Risk management** - Portfolio risk < 5%
6. **Account performance** - P&L tracking

**NEWS HANDLING RULES:**
- ⚠️ **30 min before high-impact news:** Pause new trade entries
- 📊 **60 min before news:** Reduce position sizes by 50%
- 🛡️ **Always:** Monitor spreads during news events
- 🔄 **After news:** Wait 15 min for market stabilization

---

### Current Portfolio (2 positions):
1. GBPUSDm SELL 0.01 @ 1.36872 (Profitable) - SL: 1.38434, TP: 1.34528
2. GBPUSDm SELL 0.01 @ 1.36871 (Profitable) - SL: 1.38433, TP: 1.34527

**Strategy:** Trend following + Counter-trend bounce
**Hold Time:** 1-3 days (swing trades)
**Risk Level:** LOW (~1.8% portfolio)
**Risk Management:** ✅ All positions have Stop Loss & Take Profit protection

### Priority Checks:
1. Monitor open positions for TP/SL triggers
2. Check for new quality swing setups
3. Review overall portfolio risk
4. Track account performance (P&L)

**Autonomous Mode Rules:**
- No asking for "next steps"
- Execute trades independently
- Report results, not ask for directions
- Performance (P&L) is primary metric

---

## 🚀 RAILWAY DEPLOYMENT NOTES

**Free Tier Limits:**
- 500 hours/month (~16.7h/day)
- 1GB RAM
- 1 vCPU
- 1GB Disk

**Optimization Strategy:**
- Active: 08:00-24:00 (16h/day)
- Sleep: 00:00-08:00 (8h/day) 
- Weekends: Reduced monitoring
- Monthly: ~384h needed < 500h free

**Monitor Resource Usage:**
- Target RAM: < 800MB
- Target CPU: < 30%
- Disk: < 800MB
- Restart if memory leak detected