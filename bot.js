const mineflayer = require('mineflayer');
const express = require('express');

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
    port: 25626,                // Kendi portunu yaz
    username: 'AfkBot_724',     
    version: '1.12.2'           
};

let bot;

function initBot() {
    console.log('Bot sunucuya bağlanmaya çalışıyor...');
    bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log(`${bot.username} başarıyla sunucuya giriş yaptı!`);
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000); 
    });

    // 🕵️‍♂️ İŞTE BİZE GERÇEKLERİ SÖYLEYECEK OLAN KISIM:
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
