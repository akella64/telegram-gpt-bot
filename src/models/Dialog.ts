import * as mongoose from 'mongoose';

const gialogSchema = new mongoose.Schema({
	user_id: { type: Number, required: true },
	message: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export type Dialog = mongoose.InferSchemaType<typeof gialogSchema>;
export const Dialog = mongoose.model('Dialog', gialogSchema);
