const mineflayer = require('mineflayer');
const express = require('express');
const { autoVersionForge } = require('minecraft-protocol-forge'); // 👈 SİHİRLİ EKLENTİ BURADA demiştim

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot aktif!');
});

app.listen(port, () => {
    console.log(`Web sunucusu ${port} portunda başlatıldı.`);
});

const botArgs = {
    host: '5.9.41.143', // Kendi IP'ni yaz
    port: 25626,        // Kendi portunu yaz
    username: 'AfkBot_724',     
    version: '1.12.2'           
};

let bot;

function initBot() {
    console.log('Bot sunucuya bağlanmaya çalışıyor...');
    bot = mineflayer.createBot(botArgs);

    // 🎭 BOTUN YALAN SÖYLEDİĞİ (SPOOF) KISIM
    // Sunucu hangi modları istiyorsa bot "Bende hepsi var" diye cevap verecek:
    autoVersionForge(bot._client);

    bot.on('spawn', () => {
        console.log(`${bot.username} başarıyla sunucuya giriş yaptı!`);
        
        bot.chat('/register 321ret123'); 
        
        setTimeout(() => {
            bot.chat('/login 321ret123');
            console.log('Kayıt/Giriş komutları gönderildi.');
        }, 1000);

        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000); 
    });

    bot.on('kicked', (reason) => {
        console.log('❌ SUNUCUDAN ATILMA SEBEBİ:', reason);
    });

    bot.on('end', () => {
        console.log('Bağlantı kesildi. 15 saniye içinde tekrar bağlanılacak...\n---');
        setTimeout(initBot, 15000);
    });

    bot.on('error', (err) => {
        console.log('⚠️ Bir hata meydana geldi: ', err.message || err);
    });
}

initBot();
