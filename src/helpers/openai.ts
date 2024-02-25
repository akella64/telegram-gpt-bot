import OpenAI from 'openai';

class GptOpenAi {
	private openai;
	public model: string;
	private messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];

	constructor(model: string = 'gpt-3.5-turbo') {
		this.model = model;
		this.openai = this.init();
		this.messages = [];
	}

	private init() {
		const openai = new OpenAI({
			baseURL: process.env.OPENAI_BASE_URL,
			apiKey: process.env.OPENAI_TOKEN,
		});

		if (openai.apiKey && openai.baseURL) {
			return openai;
		} else {
			throw new Error('OPENAI токен или baseUrl отсутствуют');
		}
	}

	public async gptChat(message: string): Promise<string> {
		this.messages.push({ role: 'user', content: message });

		const completion = await this.openai.chat.completions.create({
			model: this.model,
			messages: this.messages,
		});

		console.log(completion.choices[0]?.message);

		return (
			completion.choices[0]?.message?.content ||
			'Возникла ошибка в OpenAI API. Попробуйте позже.'
		);
	}

	public setModel(model: string): void {
		this.model = model;
	}

	public clearChat(): void {
		this.messages = [];
	}
}

export default GptOpenAi;
