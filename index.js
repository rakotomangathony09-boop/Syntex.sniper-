const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const axios = require('axios');

// CONFIGURATION OFFICIELLE MC ANTHONIO
const token = '8694426433:AAHijK_HaXmfuloGN7V1vVal6lxUcBWdt00'; // Votre Token
const MY_PERSONAL_ID = '7170171829'; // Votre ID personnel
const MY_CHANNEL_ID = '@VOTRE_CANAL_VVIP'; // À remplacer par l'ID de votre canal public

const bot = new TelegramBot(token, {polling: true});

console.log("🔱 SYNTX SNIPER 4 : RECHERCHE AUTONOME ACTIVÉE");

// FONCTION DE SCANNER INDÉPENDANT (RECHERCHE SUR LE WEB)
async function scannerMarcheAutonome() {
    try {
        // Le bot simule la recherche de prix Weltrade M5 sur le Cloud
        const res = await axios.get('https://api.votre-source-prix.com/weltrade-live'); 
        const candles = res.data;
        const current = candles[0]; // Bougie M5 actuelle
        const previous = candles[1]; // Bougie M5 précédente

        // 1. ALERTE PRÉDICTIVE (2 MIN AVANT LE SIGNAL)
        if (current.close <= previous.low + 5 && current.close > previous.low) {
            const prepMsg = "⚠️ **PRÉPARATION VVIP (2 MIN)**\nIndice : PAIN/GAIN\nLe prix approche d'une zone de liquidité M5.";
            bot.sendMessage(MY_CHANNEL_ID, prepMsg);
            bot.sendMessage(MY_PERSONAL_ID, "🛠 Rapport : Setup imminent sur Weltrade.");
        }

        // 2. LOGIQUE SNIPER (IMITATION DE VOTRE CAPTURE)
        if (current.low < previous.low && current.close > previous.low) {
            const signalMsg = `🔱 **SIGNAL SNIPER V4**\n` +
                              `------------------------\n` +
                              `🎯 ACTIF : PAIN/GAIN INDEX\n` +
                              `⚡ ACTION : BUY (GAINX) 📈\n\n` +
                              `💰 ENTRY : ${current.close}\n` +
                              `🛑 SL : ${current.low}\n` +
                              `✅ TP : ${current.close + 30}\n\n` +
                              `📊 STRATÉGIE : SWEEP & BOS (M5)\n` +
                              `🛡️ ANALYSE : EXPERT MC ANTHONIO`;
            
            bot.sendMessage(MY_CHANNEL_ID, signalMsg);
        }
    } catch (e) {
        console.log("Scan M5 en cours...");
    }
}

// LE SYSTÈME TRAVAILLE SEUL TOUTES LES 60 SECONDES
setInterval(scannerMarcheAutonome, 60000);

// INTERFACE WEB POUR MAINTENIR RENDER ACTIF
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("<h1>SYNTX SNIPER 4 : SCANNER AUTONOME</h1>");
    res.end(`<p>Connecté au Bot de MC Anthonio (ID: ${MY_PERSONAL_ID})</p>`);
});

server.listen(process.env.PORT || 10000);

// COMMANDE DE TEST PRIVÉE
bot.onText(/\/test/, (msg) => {
    if(msg.from.id.toString() === MY_PERSONAL_ID) {
        bot.sendMessage(MY_PERSONAL_ID, "✅ Test réussi, Michel Anthonio. Le terminal est lié à votre compte.");
    }
});
