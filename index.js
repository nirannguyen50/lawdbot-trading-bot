const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

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
  res.json({ 
    status: 'ok', 
    service: 'Clawdbot Trading Bot',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
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