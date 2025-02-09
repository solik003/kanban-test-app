import mongoose, { Schema, Document } from "mongoose";

export interface ICard extends Document {
    title: string;
    listId: mongoose.Types.ObjectId;
    description: string;

}

const CardSchema = new Schema<ICard>({
    listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

CardSchema.set('toJSON', { virtuals: true });
CardSchema.set('toObject', { virtuals: true });

export const Card = mongoose.model<ICard>("Card", CardSchema);

