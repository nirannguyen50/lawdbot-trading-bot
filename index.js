require('dotenv').config();
const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

// Validate required environment variables
const requiredEnvVars = [
  'TELEGRAM_BOT_TOKEN',
  'TELEGRAM_CHAT_ID',
  'MT5_ACCOUNT',
  'MT5_PASSWORD',
  'MT5_SERVER'
];

function validateEnvironment() {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.warn('⚠️ Missing environment variables:', missing);
    console.log('📝 Please configure these in Render dashboard');
    return false;
  }
  
  console.log('✅ Environment validation passed');
  console.log(`📊 Telegram Chat ID: ${process.env.TELEGRAM_CHAT_ID}`);
  console.log(`📊 MT5 Account: ${process.env.MT5_ACCOUNT}`);
  console.log(`📊 MT5 Server: ${process.env.MT5_SERVER}`);
  console.log(`📊 Trading Risk: ${process.env.TRADING_RISK_PERCENT || 1.5}%`);
  
  return true;
}

// Start Clawdbot Gateway (non-blocking)
function startClawdbot() {
  console.log('🚀 Starting Clawdbot Gateway...');
  
  try {
    const clawdbot = spawn('npx', ['clawdbot', 'gateway', 'start', '--no-service'], {
      stdio: 'pipe',
      detached: true
    });
    
    clawdbot.stdout.on('data', (data) => {
      console.log(`[Clawdbot] ${data.toString().trim()}`);
    });
    
    clawdbot.stderr.on('data', (data) => {
      console.error(`[Clawdbot ERROR] ${data.toString().trim()}`);
    });
    
    clawdbot.on('error', (err) => {
      console.error('❌ Failed to start Clawdbot:', err.message);
      console.log('⚠️ Clawdbot will run via npx at runtime');
    });
    
    clawdbot.on('exit', (code) => {
      console.log(`📊 Clawdbot exited with code ${code}`);
    });
    
    return clawdbot;
  } catch (err) {
    console.error('❌ Clawdbot spawn error:', err.message);
    return null;
  }
}

// Health endpoint
app.get('/health', (req, res) => {
  const envStatus = validateEnvironment() ? 'configured' : 'missing_vars';
  
  res.json({ 
    status: 'ok', 
    service: 'Clawdbot Trading Bot',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    config_status: envStatus,
    mt5_account: process.env.MT5_ACCOUNT ? '***' + process.env.MT5_ACCOUNT.slice(-4) : 'not_set',
    telegram_chat: process.env.TELEGRAM_CHAT_ID || 'not_set'
  });
});

app.get('/', (req, res) => {
  res.send('🚀 Clawdbot Trading Bot is running. Use /health for status.');
});

// Start server FIRST, then Clawdbot
app.listen(port, () => {
  console.log(`✅ Express server started on port ${port}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔧 Node version: ${process.version}`);
  
  // Validate environment
  validateEnvironment();
  
  // Start Clawdbot after server is ready
  setTimeout(() => {
    startClawdbot();
  }, 1000);
});

// Error handling
process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 Unhandled Rejection at:', promise, 'reason:', reason);
});