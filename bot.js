const mineflayer = require('mineflayer');
const express = require('express');
const forge = require('minecraft-protocol-forge');

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

    bot.once('inject_allowed', () => {
        if (forge && forge.forgeHandshake) {
            forge.forgeHandshake(bot._client, {
                forgeMods: [
                    { modid: 'mcp', version: '9.42' },
                    { modid: 'FML', version: '8.0.99.99' },
                    { modid: 'forge', version: '14.23.5.2860' },
                    
                    { modid: 'blockbuster', version: '2.7.1' },
                    { modid: 'Blockbuster', version: '2.7.1' },
                    
                    { modid: 'ebwizardry', version: '4.3.18' },
                    { modid: 'electroblobswizardry', version: '4.3.18' },
                    
                    { modid: 'gravitygun', version: '7.1.0' },
                    { modid: 'GravityGun', version: '7.1.0' },
                    
                    { modid: 'mappet', version: '0.8' },
                    { modid: 'Mappet', version: '0.8' },
                    
                    { modid: 'metamorph', version: '1.4' },
                    { modid: 'Metamorph', version: '1.4' },
                    
                    { modid: 'moreplayermodels', version: '1.12.2' },
                    { modid: 'MorePlayerModels', version: '1.12.2' },
                    
                    { modid: 'cfm', version: '6.3.0' },
                    { modid: 'mrcrayfishsfurnituremod', version: '6.3.0' },
                    
                    { modid: 'pearlstudios', version: '1.0.0' },
                    { modid: 'PearlStudios', version: '1.0.0' },
                    
                    // 🎯 SADECE "v" HARFİ OLANLARI BIRAKTIK, ÇAKIŞMA DÜZELDİ:
                    { modid: 'securitycraft', version: 'v1.9.7' },
                    { modid: 'SecurityCraft', version: 'v1.9.7' },
                    
                    { modid: 'techguns', version: '2.0.2.0' },
                    { modid: 'Techguns', version: '2.0.2.0' },
                    
                    { modid: 'boralomod', version: '2.1.0' },
                    { modid: 'boralo_mod', version: '2.1.0' },
                    { modid: 'zabristudiosboralomod', version: '2.1.0' },
                    
                    { modid: 'ariesnitroxine', version: '1.0.0' },
                    { modid: 'Ariesnitroxine', version: '1.0.0' },
                    
                    { modid: 'ichunutil', version: '7.2.0' },
                    { modid: 'iChunUtil', version: '7.2.0' },
                    
                    { modid: 'rpmods', version: '1.0.0' },
                    { modid: 'Rpmods', version: '1.0.0' },
                    
                    { modid: 'yokolma', version: '1.0.0' },
                    { modid: 'Yokolma', version: '1.0.0' },

                    { modid: 'paradise', version: '1.8.0' },
                    { modid: 'Paradise', version: '1.8.0' },

                    { modid: 'duplicatestatfix', version: '1.0.0' },
                    { modid: 'Duplicatestatfix', version: '1.0.0' }
                ]
            });
            console.log("Gelişmiş sahte mod listesi (v-patch onaylı) enjekte edildi!");
        }
    });

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
