const { Telegraf } = require('telegraf');
const axios = require('axios');

/**
 * Developer: ehsan fazli
 * Github: https://github.com/TssHack
 * Email: ehsanfazlinejad@gmail.com
 * Telegram: @devehsan
**/

const token = '6500927474:AAF0gL6sb71sprcP6Xsaobur31fSvczxgZQ'; // your telegram bot token

const bot = new Telegraf(token);

bot.start(async (ctx) => {
    const chatId = ctx.chat.id;
    const msg_id = ctx.message.message_id;
    await ctx.reply('سلام من سام عالی هستم یک دلقک برای شاد کردن اوقات شما\nسازندم : @devehsan', {
        reply_to_message_id: msg_id
    });
});

bot.on('text', async (ctx) => {
    if (ctx.chat.type === 'private') {
        const chatId = ctx.chat.id;
        const userText = ctx.message.text;
        const msg_id = ctx.message.message_id;

        const please = await ctx.reply('لطفا کمی صبر کنید...', {
            reply_to_message_id: msg_id
        });

        try {
            const response = await axios.post('https://sam-alie.onrender.com', {
                data: {
                    message: userText
                },
            }, {
                headers: {
                    Host: "sam-alie.onrender.com",
                    Connection: "keep-alive",
                    Accept: "*/*",
                    "User-Agent":
                        "com.tappz.aichat/1.2.2 iPhone/16.3.1 hw/iPhone12_5",
                    "Accept-Language": "en",
                    "Content-Type": "application/json; charset=UTF-8",
                }
            });

            if (response.status === 200) {
                const replyText = response.data.result.choices[0].text;
                await ctx.telegram.editMessageText(chatId, please.message_id, null, replyText, {
                    parse_mode: 'Markdown'
                });
            } else {
                throw new Error('متاسفانه خطایی رخ داده است.');
            }
        } catch (error) {
            await ctx.telegram.editMessageText(chatId, please.message_id, null, 'متاسفانه خطایی رخ داده است.');
        }
    } else if (ctx.chat.type !== 'private' && ctx.message.text.startsWith('gpt:') || ctx.message.text.startsWith('.gpt')) {
        const chatId = ctx.chat.id;
        const userText = ctx.message.text.replace(/^gpt:|^\.gpt/, '').trim();
        const msg_id = ctx.message.message_id;

        const please = await ctx.reply('لطفا کمی صبر کنید...', {
            reply_to_message_id: msg_id
        });

        try {
            const response = await axios.post('https://sam-alie.onrender.com', {
                data: {
                    message: userText
                },
            }, {
                headers: {
                    Host: "sam-alie.onrender.com",
                    Connection: "keep-alive",
                    Accept: "*/*",
                    "User-Agent":
                        "com.tappz.aichat/1.2.2 iPhone/16.3.1 hw/iPhone12_5",
                    "Accept-Language": "en",
                    "Content-Type": "application/json; charset=UTF-8",
                }
            });

            if (response.status === 200) {
                const replyText = response.data.result.choices[0].text;
                await ctx.telegram.editMessageText(chatId, please.message_id, null, replyText, {
                    parse_mode: 'Markdown'
                });
            } else {
                throw new Error('متاسفانه خطایی رخ داده است.');
            }
        } catch (error) {
            await ctx.telegram.editMessageText(chatId, please.message_id, null, 'متاسفانه خطایی رخ داده است.');
        }
    }
});

bot.launch();
