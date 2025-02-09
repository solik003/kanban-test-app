import mongoose, { Schema, Document } from "mongoose";

export interface ICard extends Document {
    listId: mongoose.Types.ObjectId;
    title: string;
    description: string;
}

const CardSchema = new Schema<ICard>({
    listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

export const Card = mongoose.model<ICard>("Card", CardSchema);

