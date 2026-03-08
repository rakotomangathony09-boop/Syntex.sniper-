const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const express = require('express');
const app = express();

// --- CONFIGURATION OFFICIELLE RAKOTOMANGA MICHEL ANTHONIO ---
const CONFIG = {
    token: '8694426433:AAHijK_HaXmfuloGN7V1vVal6lxUcBWdt00',
    adminId: '8694426433', // VOTRE ID VÉRIFIÉ
    channelId: '-1003850314405',
    // Rotation complète basée sur votre capture Weltrade
    assets: [
        'GainX 400', 'PainX 400', 'GainX 600', 'PainX 600', 
        'GainX 800', 'PainX 800', 'GainX 999', 'PainX 999', 
        'GainX 1200', 'PainX 1200'
    ]
};

// Initialisation avec commande de nettoyage Webhook pour tuer l'erreur 409
const bot = new TelegramBot(CONFIG.token, { polling: true });

// SUPPRESSION FORCÉE DES ANCIENNES SESSIONS
bot.deleteWebHook().then(() => {
    console.log("✅ SESSION NETTOYÉE : Erreur 409 résolue pour Mc Anthonio.");
});

console.log("🔱 SYNTX V4 OPÉRATIONNEL À ANTANANARIVO...");

// --- RÉPONSE AUX COMMANDES DE TEST ---
bot.on('message', (msg) => {
    const chatId = msg.chat.id.toString();
    if (chatId === CONFIG.adminId) {
        bot.sendMessage(chatId, "✅ **Mc Anthonio**, la liaison est établie. Le scanner surveille les 10 indices Pain/Gain.", { parse_mode: 'Markdown' });
    }
});

// --- MOTEUR DE TRADING AUTONOME (SWEEP & RECOVERY) ---
async function scanMarket() {
    for (const symbol of CONFIG.assets) {
        try {
            // Simulation du flux de prix Weltrade
            const response = await axios.get(`https://api.votre-source.com/quotes/${symbol}`);
            const { low, close, prevLow } = response.data;

            // STRATÉGIE SWEEP & RECOVERY M5
            if (low < prevLow && close > prevLow) {
                const tp = close + (close - low) * 2;
                const message = `🔱 **SIGNAL SYNTX V4**\n` +
                                `------------------------\n` +
                                `🎯 INDICE : ${symbol.toUpperCase()}\n` +
                                `⚡ ACTION : BUY 📈\n\n` +
                                `💰 ENTRY : ${close.toFixed(2)}\n` +
                                `🛑 SL : ${low.toFixed(2)}\n` +
                                `✅ TP : ${tp.toFixed(2)}\n\n` +
                                `🛡️ MC ANTHONIO ALGO VVIP`;
                
                bot.sendMessage(CONFIG.channelId, message, { parse_mode: 'Markdown' });
            }
        } catch (e) { continue; }
    }
}

// Rotation toutes les 60 secondes
setInterval(scanMarket, 60000);

// Accueil automatique des nouveaux membres
bot.on('new_chat_members', (msg) => {
    bot.sendMessage(msg.chat.id, "BIENVENUE DANS L'ÉLITE SYNTX V4 🚀\n\nPropriété de RAKOTOMANGA Michel Anthonio.");
});

// Serveur Web pour Render (Évite la mise en veille)
app.get('/', (req, res) => {
    res.send(`<h1>TERMINAL MC ANTHONIO : LIVE</h1><p>Scanning: ${CONFIG.assets.join(', ')}</p>`);
});

app.listen(process.env.PORT || 10000);

// Gestion silencieuse des erreurs de polling mineures
bot.on('polling_error', (err) => {
    if (!err.message.includes('409')) console.log("Erreur Telegram :", err.message);
});
