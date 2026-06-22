const mineflayer = require('mineflayer');
const express = require('express');

// 1. RENDER VE UPTIMEROBOT İÇİN WEB SUNUCUSU
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot aktif ve Render üzerinde 7/24 çalışıyor!');
});

app.listen(port, () => {
    console.log(`Web sunucusu ${port} portunda başlatıldı.`);
});

// 2. MINECRAFT BOT AYARLARI
const botArgs = {
    host: '5.9.41.143', // Buraya modlu sunucunun IP'sini yaz (örn: sunucu.com)
    port: 25626,                // Port farklıysa değiştir
    username: 'AfkBot_724',     // Botun oyundaki ismi
    version: '1.12.2'           // Mohist sürümün
};

let bot;

function initBot() {
    console.log('Bot sunucuya bağlanmaya çalışıyor...');
    bot = mineflayer.createBot(botArgs);

    // Bot sunucuya başarıyla girdiğinde
    bot.on('spawn', () => {
        console.log(`${bot.username} başarıyla sunucuya giriş yaptı!`);
        
        // AFK atılmamak için her 30 saniyede bir zıplar
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000); 
    });

    // Bağlantı koparsa otomatik geri bağlanma algoritması
    bot.on('end', () => {
        console.log('Bağlantı kesildi. 15 saniye içinde tekrar bağlanılacak...');
        setTimeout(initBot, 15000);
    });

    // Hata durumunda çökmemesi için hatayı yakala
    bot.on('error', (err) => {
        console.log('Bir hata meydana geldi: ', err);
    });
}

// Sistemi başlat
initBot();