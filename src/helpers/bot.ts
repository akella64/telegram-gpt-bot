import { Bot, Keyboard, InlineKeyboard } from 'grammy';

class TelegramBot {
	public bot;

	constructor() {
		this.bot = this.init();
	}

	private init() {
		const token = process.env.BOT_TOKEN;
		if (!token) throw new Error('Телеграм бот токен отсутствует');
		const bot = new Bot(token);

		return bot;
	}

	public keyboardMenu(actualModel: string) {
		const keyboard = new Keyboard()
			.text('Очистить историю диалога')
			.row()
			.text('Мои чаты')
			.row()
			.text(`Изменить версию GPT (Текущая: ${actualModel})`)
			.row()
			.resized();

		return keyboard;
	}

	public inlineModels() {
		const models = new InlineKeyboard()
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

		return models;
	}
}

export default TelegramBot;
