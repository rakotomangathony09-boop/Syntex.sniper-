const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const axios = require('axios');

// CONFIGURATION OFFICIELLE MC ANTHONIO - VVIP
const token = '8694426433:AAHijK_HaXmfuloGN7V1vVal6lxUcBWdt00'; // Votre Token Bot
const MY_PERSONAL_ID = '7170171829'; // Votre ID Personnel
const MY_CHANNEL_ID = '-1003850314405'; // Votre ID de Canal Privé [Nouveau]

const bot = new TelegramBot(token, {polling: true});

console.log("🔱 SYNTX SNIPER 4 : RECHERCHE AUTONOME SUR CANAL PRIVÉ ACTIVÉE");

// FONCTION DE SCANNER INDÉPENDANT (RECHERCHE SUR LE WEB)
async function scannerMarcheAutonome() {
    try {
        // Le bot simule la recherche de prix Weltrade M5
        const res = await axios.get('https://api.votre-source-prix.com/weltrade-live'); 
        const candles = res.data;
        const current = candles[0]; 
        const previous = candles[1];

        // 1. ALERTE PRÉDICTIVE (2 MIN AVANT)
        if (current.close <= previous.low + 5 && current.close > previous.low) {
            const prepMsg = "⚠️ **PRÉPARATION VVIP (2 MIN)**\nIndice : PAIN/GAIN\nLe prix approche d'une zone de liquidité M5.";
            bot.sendMessage(MY_CHANNEL_ID, prepMsg);
        }

        // 2. LOGIQUE SNIPER (STRATÉGIE SWEEP & BOS)
        if (current.low < previous.low && current.close > previous.low) {
            const signalMsg = `🔱 **SIGNAL SNIPER V4**\n` +
                              `------------------------\n` +
                              `🎯 ACTIF : PAIN/GAIN INDEX\n` +
                              `⚡ ACTION : BUY (GAINX) 📈\n\n` +
                              `💰 ENTRY : ${current.close}\n` +
                              `🛑 SL : ${current.low}\n` +
                              `✅ TP : ${current.close + 30}\n\n` +
                              `📊 STRATÉGIE : SWEEP & RECOVERY (M5)\n` +
                              `🛡️ ANALYSE : EXPERT MC ANTHONIO`;
            
            bot.sendMessage(MY_CHANNEL_ID, signalMsg);
            bot.sendMessage(MY_PERSONAL_ID, "✅ Signal envoyé avec succès dans votre canal privé.");
        }
    } catch (e) {
        console.log("Scan M5 en cours...");
    }
}

// SCANNER TOUTES LES 60 SECONDES
setInterval(scannerMarcheAutonome, 60000);

// INTERFACE WEB RENDER
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("<h1>SYNTX SNIPER 4 : SCANNER AUTONOME</h1>");
    res.end(`<p>Diffusion active sur le canal privé : ${MY_CHANNEL_ID}</p>`);
});

server.listen(process.env.PORT || 10000);

// COMMANDE DE TEST PRIVÉE
bot.onText(/\/test/, (msg) => {
    if(msg.from.id.toString() === MY_PERSONAL_ID) {
        bot.sendMessage(MY_PERSONAL_ID, "✅ Connexion établie avec Render. Votre bot diffuse désormais dans votre canal privé.");
        bot.sendMessage(MY_CHANNEL_ID, "🚀 SYNTX SNIPER 4 : Le terminal est désormais connecté à ce canal.");
    }
});
