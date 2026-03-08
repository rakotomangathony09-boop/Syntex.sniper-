const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// 1. CONFIGURATION (Utilisation de votre Token valide)
const token = '8694426433:AAHijK_HaXmfuloGN7V1vVal6lxUcBWdt00';
const bot = new TelegramBot(token, {
  polling: {
    autoStart: true,
    params: { timeout: 10 }
  }
});

console.log("Terminal Sniper de MC Anthonio - Système Prêt");

// 2. GESTION SILENCIEUSE DU DÉMARRAGE
bot.on('polling_error', (error) => {
  // Ce message dans vos logs est normal au début, Telegram se synchronise
  console.log("Synchronisation en cours..."); 
});

// 3. RÉPONSE AUX COMMANDES
bot.onText(/\/status/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ SYNTX TERMINAL : Opérationnel.\n👤 Trader : MC Anthonio\n📡 Scan : GainX / PainX");
});

bot.on('message', (msg) => {
  if (msg.text === '/start') {
    bot.sendMessage(msg.chat.id, "Bienvenue MC Anthonio. Tapez /status pour vérifier le terminal.");
  }
});

// 4. INTERFACE VISUELLE (Port 10000)
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SYNTX SNIPER - MC ANTHONIO</title>
      <style>
        body { background: #0a0a0a; color: #00ff66; font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .box { border: 1px solid #00ff66; padding: 40px; border-radius: 10px; box-shadow: 0 0 30px rgba(0, 255, 102, 0.3); text-align: center; border-style: double; }
        h1 { font-size: 2rem; letter-spacing: 5px; margin-bottom: 5px; color: #fff; text-shadow: 0 0 10px #00ff66; }
        .sub { color: #00ff66; font-weight: bold; letter-spacing: 3px; margin-bottom: 25px; font-size: 1.1rem; }
        .status-dot { height: 14px; width: 14px; background-color: #00ff66; border-radius: 50%; display: inline-block; margin-right: 12px; box-shadow: 0 0 15px #00ff66; animation: blink 1.5s infinite; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.2; } 100% { opacity: 1; } }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>SYNTX SNIPER</h1>
        <div class="sub">BY MC ANTHONIO</div>
        <div><span class="status-dot"></span><strong>TERMINAL LIVE 24/7</strong></div>
        <p style="color:#888; margin-top:20px;">SYSTEM STATUS: <span style="color:#fff">READY</span></p>
        <div style="margin-top:30px; font-size: 0.8rem; color: #333;">&copy; 2026 M.A. RAKOTOMANGA</div>
      </div>
    </body>
    </html>
  `);
  res.end();
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log("Interface MC Anthonio active sur le port " + PORT);
});
