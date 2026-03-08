const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// 1. CONFIGURATION DU BOT AVEC LE NOUVEAU TOKEN
const token = '8694426433:AAHXEyy5mIX-u5HfcjRLfeE9tFJNQ5X11-s';
const bot = new TelegramBot(token, {polling: true});

console.log("Terminal Sniper Activé - Scan permanent des flux GainX/PainX...");

// 2. LOGIQUE DE RÉPONSE DU BOT
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === '/status') {
    bot.sendMessage(chatId, "✅ SYNTX TERMINAL : Opérationnel.\n📡 Scan actif : Indices 400-1200\n🔋 État : 24h/24 (Hébergé sur Cloud)");
  }
});

// 3. INTERFACE WEB (Indispensable pour Render et UptimeRobot)
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SYNTX SNIPER V1.1</title>
      <style>
        body { background: #0a0a0a; color: #00ff66; font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .box { border: 1px solid #00ff66; padding: 40px; border-radius: 5px; box-shadow: 0 0 30px rgba(0, 255, 102, 0.2); text-align: center; max-width: 400px; }
        h1 { font-size: 1.5rem; letter-spacing: 4px; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px; }
        .status-dot { height: 12px; width: 12px; background-color: #00ff66; border-radius: 50%; display: inline-block; margin-right: 10px; box-shadow: 0 0 10px #00ff66; animation: blink 1.5s infinite; }
        p { color: #888; font-size: 0.9rem; margin: 10px 0; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>SYNTX SNIPER</h1>
        <div><span class="status-dot"></span><span style="font-weight:bold">SYSTÈME LIVE</span></div>
        <p>TERMINAL ID: <span style="color:#00ff66">#SNIPER-VVIP-01</span></p>
        <p>MONITORING: <span style="color:#fff">GAINX & PAINX FLUX</span></p>
        <div style="margin-top:20px; font-size: 0.7rem; color: #444;">&copy; 2026 RAKOTOARISOA - VVIP ACCESS</div>
      </div>
    </body>
    </html>
  `);
  res.end();
});

// Utilisation du port 10000 imposé par Render
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log("Serveur de monitoring lancé sur le port " + PORT);
});
