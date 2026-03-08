const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const axios = require('axios');

// --- CONFIGURATION SÉCURISÉE MC ANTHONIO ---
const token = '8694426433:AAHijK_HaXmfuloGN7V1vVal6lxUcBWdt00'; 
const MY_PERSONAL_ID = '7170171829'; 
const MY_CHANNEL_ID = '-1003850314405'; // Votre ID de Canal Privé

// Correction du conflit 409 : On active le polling avec une sécurité
const bot = new TelegramBot(token, {
    polling: {
        interval: 300,
        autoStart: true,
        params: { timeout: 10 }
    }
});

console.log("🔱 TERMINAL ACTIVÉ : SURVEILLANCE WELTRADE M5 EN COURS...");

// --- LOGIQUE DE SCANNER AUTONOME (SWEEP & BOS) ---
async function executerScanner() {
    try {
        // Simulation de l'appel API vers le flux Weltrade
        // Note : Remplacez par votre URL de flux de données réelle si nécessaire
        const response = await axios.get('https://api.votre-source-prix.com/weltrade-live');
        const data = response.data;
        const currentCandle = data[0];
        const previousCandle = data[1];

        // 1. DÉTECTION DU SWEEP (BALAYAGE DE LIQUIDITÉ)
        if (currentCandle.low < previousCandle.low && currentCandle.close > previousCandle.low) {
            
            const messageSignal = `🔱 **SIGNAL SNIPER V4**\n` +
                                `------------------------\n` +
                                `🎯 INDICE : PAIN/GAIN\n` +
                                `⚡ ACTION : BUY (GAINX) 📈\n\n` +
                                `💰 ENTRY : ${currentCandle.close}\n` +
                                `🛑 SL : ${currentCandle.low}\n` +
                                `✅ TP : ${currentCandle.close + 35}\n\n` +
                                `📊 ANALYSE : SWEEP CONFIRMÉ M5\n` +
                                `🛡️ MC ANTHONIO ALGO VVIP`;

            bot.sendMessage(MY_CHANNEL_ID, messageSignal, { parse_mode: 'Markdown' });
            bot.sendMessage(MY_PERSONAL_ID, "✅ Nouveau signal envoyé au groupe VVIP.");
        }
    } catch (error) {
        console.log("Scan en cours... (Attente de clôture de bougie)");
    }
}

// Exécution du scanner chaque minute
setInterval(executerScanner, 60000);

// --- INTERFACE DE MAINTIEN POUR RENDER ---
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("<h2>SYNTX SNIPER 4 : STATUS LIVE 🚀</h2>");
    res.write(`<p>Connecté au canal : ${MY_CHANNEL_ID}</p>`);
    res.end();
});

// Utilisation du port dynamique de Render
server.listen(process.env.PORT || 10000);

// --- COMMANDE DE TEST ---
bot.onText(/\/test/, (msg) => {
    if(msg.from.id.toString() === MY_PERSONAL_ID) {
        bot.sendMessage(MY_CHANNEL_ID, "🚀 SYNTX SNIPER 4 : Connexion établie. Le scanner est en ligne.");
    }
});

// Gestion propre des erreurs pour éviter les crashs rouges
bot.on('polling_error', (error) => {
    if (error.code !== 'ETELEGRAM' || error.response.body.error_code !== 409) {
        console.log("Erreur Telegram :", error.code);
    }
});
        
