const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const express = require('express');
const app = express();

// --- CONFIGURATION OFFICIELLE MC ANTHONIO ---
const CONFIG = {
    token: '8694426433:AAHijK_HaXmfuloGN7V1vVal6lxUcBWdt00',
    channelId: '-1003850314405',
    adminId: '7170171829',
    // Gamme complète vérifiée selon votre capture
    assets: [
        'GainX 400', 'PainX 400', 
        'GainX 600', 'PainX 600', 
        'GainX 800', 'PainX 800', 
        'GainX 999', 'PainX 999', 
        'GainX 1200', 'PainX 1200'
    ]
};

const bot = new TelegramBot(CONFIG.token, { polling: true });

// --- LOGIQUE DE SCANNER M5 ---
async function runAutoTrade() {
    for (const symbol of CONFIG.assets) {
        try {
            // Simulation de l'appel API Weltrade
            const response = await axios.get(`https://api.votre-source.com/quotes/${symbol}`);
            const { low, close, prevLow } = response.data;

            // STRATÉGIE SWEEP & RECOVERY
            if (low < prevLow && close > prevLow) {
                const tp = close + (close - low) * 2;
                const message = `🔱 **SYNTX SNIPER V4**\n` +
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
setInterval(runAutoTrade, 60000);

// Accueil automatique des nouveaux membres
bot.on('new_chat_members', (msg) => {
    bot.sendMessage(msg.chat.id, `BIENVENUE DANS L'ÉLITE SYNTX V4 🚀\n\nPropriété de RAKOTOMANGA Michel Anthonio.`);
});

// Serveur de maintien pour Render
app.get('/', (req, res) => { res.send("MC ANTHONIO TERMINAL : LIVE"); });
app.listen(process.env.PORT || 10000);
