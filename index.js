const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

// Start Clawdbot Gateway
function startClawdbot() {
  console.log('🚀 Starting Clawdbot Gateway...');
  const clawdbot = spawn('npx', ['clawdbot', 'gateway', 'start', '--no-service'], {
    stdio: 'inherit',
    detached: true
  });
  
  clawdbot.on('error', (err) => {
    console.error('❌ Failed to start Clawdbot:', err);
  });
  
  clawdbot.on('exit', (code) => {
    console.log(`📊 Clawdbot exited with code ${code}`);
  });
  
  return clawdbot;
}

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Clawdbot Trading Bot',
    timestamp: new Date().toISOString() 
  });
});

app.get('/', (req, res) => {
  res.send('🚀 Clawdbot Trading Bot is running. Use /health for status.');
});

// Start server and Clawdbot
app.listen(port, () => {
  console.log(`✅ Health check server started on port ${port}`);
  startClawdbot();
});