const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// 1. CONFIGURATION AVEC VOTRE NOUVEAU TOKEN
const token = '8694426433:AAHijK_HaXmfuloGN7V1vVal6lxUcBWdt00';
const bot = new TelegramBot(token, {polling: true});

console.log("Terminal Sniper Activé - Propriété de MC Anthonio");

// 2. LOGIQUE DE RÉPONSE DU BOT
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === '/status') {
    bot.sendMessage(chatId, "✅ SYNTX TERMINAL : Opérationnel.\n👤 Trader : MC Anthonio\n📡 Scan : GainX / PainX\n🔋 État : 24h/24 (Cloud)");
  }
});

// 3. INTERFACE VISUELLE (Pour Render et UptimeRobot)
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SYNTX SNIPER - MC ANTHONIO</title>
      <style>
        body { background: #0a0a0a; color: #00ff66; font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .box { border: 1px solid #00ff66; padding: 40px; border-radius: 5px; box-shadow: 0 0 30px rgba(0, 255, 102, 0.2); text-align: center; max-width: 420px; }
        h1 { font-size: 1.8rem; letter-spacing: 4px; margin-bottom: 5px; color: #fff; text-transform: uppercase; }
        .sub { color: #00ff66; font-weight: bold; letter-spacing: 2px; margin-bottom: 20px; }
        .status-dot { height: 12px; width: 12px; background-color: #00ff66; border-radius: 50%; display: inline-block; margin-right: 10px; box-shadow: 0 0 10px #00ff66; animation: blink 1.5s infinite; }
        p { color: #888; font-size: 0.9rem; margin: 10px 0; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>SYNTX SNIPER</h1>
        <div class="sub">BY MC ANTHONIO</div>
        <div><span class="status-dot"></span><strong>SYSTÈME LIVE 24/7</strong></div>
        <p>TERMINAL ID: <span style="color:#00ff66">#SNIPER-VVIP-PRO</span></p>
        <p>MONITORING: GAINX & PAINX FLUX</p>
        <div style="margin-top:20px; font-size: 0.7rem; color: #444;">&copy; 2026 M.A. RAKOTOMANGA - VVIP ACCESS ONLY</div>
      </div>
    </body>
    </html>
  `);
  res.end();
});

// Port dynamique pour Render
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log("Terminal de MC Anthonio lancé sur le port " + PORT);
});
