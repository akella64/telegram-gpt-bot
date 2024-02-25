import TelegramBot from './helpers/bot';
import GptOpenAi from './helpers/openai';

// gpt init
const gptOpenAi = new GptOpenAi();

// Bot init
const telegramBot = new TelegramBot();

// Bot Start command
telegramBot.bot.command('start', ctx => {
	const name: string = ctx.message?.from?.first_name || '';

	return ctx.reply(
		`Привет ${name}! Я GPT Bot - твой персональный собеседник и помощник в чате. Я готов обсудить с тобой что угодно: от последних новостей до творчества и науки. Просто напиши мне, и давай начнем наше общение!`,
		{
			reply_markup: telegramBot.keyboardMenu(gptOpenAi.model),
		},
	);
});

// Help
telegramBot.bot.command('help', ctx =>
	ctx.reply(`
🏁 Для начала диалога с ботом, начните писать в чат.\n
🧹 Для очистки текущего диалога нажмите кнопку "Очистить историю диалога" в меню.\n
⏹️ Чтобы перезагрузить бота или очистить всю историю чата используйте команду /start\n
🛠️ Просмотр/сохранение диалога и смена версии находятся в разработке.`),
);

// Clear history dialog
telegramBot.bot.hears('Очистить историю диалога', ctx => {
	gptOpenAi.clearChat();
	ctx.reply('История текущего чата очищена.');
});

// View chats
telegramBot.bot.hears('Мои чаты', ctx => {
	ctx.reply('В разработке');
});

// Change version GPT (in development)
/* telegramBot.inlineModels().inline_keyboard.forEach(row => {
	row.forEach(button => {
		telegramBot.bot.callbackQuery(button.text, async ctx => {
			gptOpenAi.clearChat();
			gptOpenAi.setModel(button.text);

			await ctx.deleteMessage();

			await ctx.reply(`Версия GPT изменена на ${button.text}.`, {
				reply_markup: telegramBot.keyboardMenu(button.text),
			});
		});
	});
}); */

telegramBot.bot.hears(
	`Изменить версию GPT (Текущая: ${gptOpenAi.model})`,
	ctx => {
		ctx.reply(
			`Смена версии GPT находится в разработке. Пока что вы можете насладиться диалогом с ${gptOpenAi.model}.`,
		);
		/* 	ctx.reply('Изменить версию gpt', {
		reply_markup: versionsGpt,
	}); */
	},
);

// User send message
telegramBot.bot.on('message', async ctx => {
	const message: string = ctx.update.message?.text || '';

	await ctx.api.sendChatAction(ctx.chat.id, 'typing');

	await ctx.reply(await gptOpenAi.gptChat(message));
});

telegramBot.bot.start();
