const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const express = require('express');
const app = express();

// --- CONFIGURATION OFFICIELLE RAKOTOMANGA MICHEL ANTHONIO ---
const CONFIG = {
    token: '8694426433:AAHijK_HaXmfuloGN7V1vVal6lxUcBWdt00',
    adminId: '8694426433', // VOTRE ID MIS À JOUR
    channelId: '-1003850314405',
    assets: [
        'GainX 400', 'PainX 400', 
        'GainX 600', 'PainX 600', 
        'GainX 800', 'PainX 800', 
        'GainX 999', 'PainX 999', 
        'GainX 1200', 'PainX 1200'
    ] // Rotation complète selon votre capture
};

// Initialisation avec sécurité anti-conflit
const bot = new TelegramBot(CONFIG.token, { 
    polling: {
        interval: 300,
        autoStart: true,
        params: { timeout: 10 }
    }
});

console.log("🔱 SYNTX V4 ACTIVÉ POUR MC ANTHONIO...");

// --- RÉPONSE AUX COMMANDES (TEST DE LIAISON) ---
bot.on('message', (msg) => {
    const chatId = msg.chat.id.toString();
    if (chatId === CONFIG.adminId) {
        bot.sendMessage(chatId, "✅ **Mc Anthonio**, votre terminal est en ligne et scanne actuellement les 10 indices Weltrade.", { parse_mode: 'Markdown' });
    }
});

// --- MOTEUR DE SCANNER AUTONOME (SWEEP & RECOVERY) ---
async function executerRotation() {
    for (const asset of CONFIG.assets) {
        try {
            // Simulation de l'appel API vers Weltrade
            const response = await axios.get(`https://api.votre-source.com/quotes/${asset}`);
            const { low, close, prevLow } = response.data;

            // STRATÉGIE : SWEEP DE LIQUIDITÉ M5
            if (low < prevLow && close > prevLow) {
                const signal = `🔱 **SIGNAL SYNTX V4**\n` +
                              `------------------------\n` +
                              `🎯 INDICE : ${asset.toUpperCase()}\n` +
                              `⚡ ACTION : BUY 📈\n\n` +
                              `💰 ENTRY : ${close.toFixed(2)}\n` +
                              `🛑 SL : ${low.toFixed(2)}\n` +
                              `✅ TP : ${(close + (close - low) * 2).toFixed(2)}\n\n` +
                              `🛡️ MC ANTHONIO ALGO VVIP`;

                bot.sendMessage(CONFIG.channelId, signal, { parse_mode: 'Markdown' });
            }
        } catch (e) { continue; }
    }
}

// Lancement de la rotation chaque minute
setInterval(executerRotation, 60000);

// --- MAINTIEN DU SERVEUR RENDER ---
app.get('/', (req, res) => {
    res.send(`<h1>Mc Anthonio Terminal : LIVE</h1><p>Scanning ${CONFIG.assets.length} assets...</p>`);
});

app.listen(process.env.PORT || 10000);

// Gestion propre des erreurs de polling
bot.on('polling_error', (err) => {
    if (err.code !== 'ETELEGRAM' || err.response.body.error_code !== 409) {
        console.log("Erreur :", err.code);
    }
});
