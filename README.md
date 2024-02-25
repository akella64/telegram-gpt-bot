# Telegram Bot GPT

Telegram Bat GPT is a project that is a chatbot for Telegram capable of conducting conversations with users using the GPT text generation model. This bot was created using the [grammy](https://grammy.dev/) framework to work with the Telegram API and [bun](https://bun.sh/) as a JavaScript runtime environment on the server.

###Installation and running:

1. Cloning the repository

```bash
git clone https://github.com/akella64/telegram-gpt-bot.git
```

2. Go to the project and set the necessary variables in .env

```bash
cd ./telegram-gpt-bot && cp sample.env .env
```

3. Install dependencies

```bash
bun install
```

4. Launching in development mode

```bash
bun dev
```

Some sections are under development. These are: managing dialogs, changing the bot model, uploading images and files.
