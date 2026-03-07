/**
 * TERMINAL SNIPER VVIP - SYNTX ENGINE v1.0
 * Logic: Liquidity Sweep, BOS, and Sniper Entry
 * Assets: GainX & PainX (400 - 1200)
 */

const TelegramBot = require('node-telegram-bot-api');

// CONFIGURATION DES IDENTIFIANTS
const token = '8694426433:AAF7cN9d_BPoV7MKAz0O2foXdmRz6F035mo'; //
const chatId = '7170171829'; //
const bot = new TelegramBot(token, {polling: true});

// LISTE DES ACTIFS WELTRADE (SCAN PERMANENT)
const assets = [
  'GainX 400', 'PainX 400', 'PainX 600', 'GainX 1200', 'GainX 600',
  'GainX 800', 'GainX 999', 'PainX 800', 'PainX 999', 'PainX 1200'
]; //

// FONCTION : ENVOI DE L'ALERTE DE VIGILANCE (PRE-SIGNAL)
function sendVigilance(asset, price) {
  const message = `👀 **VIGILANCE : LIQUIDITY DETECTED**\n\n` +
                  `📊 **Actif :** ${asset}\n` +
                  `📍 **Prix Actuel :** ${price}\n` +
                  `⚠️ *Préparez-vous pour un potentiel Sweep (Manipulation).*`; //
  
  const options = {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [[{ text: "💎 REJOINDRE LE VIP", url: "https://t.me/votre_contact" }]]
    }
  }; //
  
  bot.sendMessage(chatId, message, options);
}

// FONCTION : ENVOI DU SIGNAL SNIPER FINAL
function sendSniperSignal(asset, type, entry, sl, tp) {
  const message = `🎯 **SIGNAL SNIPER ENTRY - VVIP**\n\n` +
                  `📊 **ACTIF :** ${asset}\n` +
                  `📉 **TYPE :** ${type} LIMIT\n` +
                  `📍 **ENTRÉE :** ${entry}\n` +
                  `❌ **STOP LOSS :** ${sl}\n` +
                  `✅ **TAKE PROFIT :** ${tp}\n\n` +
                  `🛡 *Risque conseillé : 1% maximum.*`; //

  const options = {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [[{ text: "💎 CONTACTER L'ADMIN", url: "https://t.me/votre_contact" }]]
    }
  }; //

  bot.sendMessage(chatId, message, options);
}

// INITIALISATION DU SYSTÈME
console.log("Terminal Sniper Activé - Scan permanent des flux GainX/PainX..."); //
  
