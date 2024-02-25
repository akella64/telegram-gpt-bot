import { Bot } from 'grammy';

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('Телеграм бот токен отсутствует');

export const bot = new Bot(token);
