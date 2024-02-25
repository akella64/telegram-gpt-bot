import * as mongoose from 'mongoose';
import { Dialog } from '../models/Dialog';

// connect to database
await mongoose.connect(
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`,
);

const errorMessage: string = 'Возникла ошибка в базе данных, попробуйте позже.';

export const saveDialog = async (user_id: number, message: string) => {
	try {
		const item = new Dialog({
			user_id,
			message,
		});

		await item.save();
	} catch (error) {
		console.error(error);

		throw new Error(errorMessage);
	}
};

export const getDialogsByUser = async (user_id: number) => {
	try {
		const items = await Dialog.find({ user_id });
		return items;
	} catch (error) {
		console.error('Error:', error);
		throw new Error(errorMessage);
	}
};

// disconnect
await mongoose.disconnect();
