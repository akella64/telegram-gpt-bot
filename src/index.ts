import { bot } from './helpers/bot';
import GptOpenAi from './helpers/openai';
import { Keyboard } from 'grammy';

// gpt init
const gptOpenAi = new GptOpenAi();

// Menu
const keyboard = new Keyboard()
	.text('Очистить историю диалога')
	.row()
	.text('Мои чаты')
	.row()
	.text(`Изменить версию GPT (Текущая: ${gptOpenAi.model})`)
	.row()
	.resized();

// Bot Start command
bot.command('start', ctx => {
	const name: string = ctx.message?.from?.first_name || '';

	return ctx.reply(
		`Привет ${name}! Я GPT Bot - твой персональный собеседник и помощник в чате. Я готов обсудить с тобой что угодно: от последних новостей до творчества и науки. Просто напиши мне, и давай начнем наше общение!`,
		{
			reply_markup: keyboard,
		},
	);
});

// Help
bot.command('help', ctx =>
	ctx.reply(`
🏁 Для начала диалога с ботом, начните писать в чат.\n
🧹 Для очистки текущего диалога нажмите кнопку "Очистить историю диалога" в меню.\n
⏹️ Чтобы перезагрузить бота или очистить всю историю чата используйте команду /start\n
🛠️ Просмотр/сохранение диалога и смена версии находятся в разработке.`),
);

// Clear history dialog
bot.hears('Очистить историю диалога', ctx => {
	gptOpenAi.clearChat();
	ctx.reply('История текущего чата очищена.');
});

bot.hears('Мои чаты', ctx => {
	ctx.reply('В разработке');
});

// Change version GPT
/* const versionsGpt = new InlineKeyboard()
	.text('gpt-3.5-turbo', 'gpt-3.5-turbo')
	.row()
	.text('gemini-pro', 'gemini-pro')
	.row()
	.text('gemini-pro-vision', 'gemini-pro-vision')
	.row()
	.text('llama-2-70b-chat', 'llama-2-70b-chat')
	.row()
	.text('mistral-7b', 'mistral-7b')
	.row()
	.text('mixtral-8x7', 'mixtral-8x7')
	.row();

versionsGpt.inline_keyboard.forEach(row => {
	row.forEach(button => {
		bot.callbackQuery(button.text, async ctx => {
			const keyboard = new Keyboard()
				.text('Очистить историю диалога')
				.row()
				.text('Мои чаты')
				.row()
				.text(`Изменить версию GPT (Текущая: ${button.text})`)
				.row()
				.resized();

			//	РАЗОБРАТЬСЯ СО СМЕНОЙ МОДЕЛИ

			gptOpenAi.clearChat();
			gptOpenAi.setModel(button.text);

			await ctx.deleteMessage();

			await ctx.reply(`Версия GPT изменена на ${button.text}.`, {
				reply_markup: keyboard,
			});
		});
	});
}); */

bot.hears(`Изменить версию GPT (Текущая: ${gptOpenAi.model})`, ctx => {
	ctx.reply(
		`Смена версии GPT находится в разработке. Пока что вы можете насладиться диалогом с ${gptOpenAi.model}.`,
	);

	/* 	ctx.reply('Изменить версию gpt', {
		reply_markup: versionsGpt,
	}); */
});

// User send message
bot.on('message', async ctx => {
	const message: string = ctx.update.message?.text || '';

	await ctx.api.sendChatAction(ctx.chat.id, 'typing');

	await ctx.reply(await gptOpenAi.gptChat(message));
});

bot.start();
