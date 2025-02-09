import mongoose, { Schema, Document } from "mongoose";
import { ICard } from "./Card";

export interface IList extends Document {
    title: string;
    boardId: mongoose.Types.ObjectId;
    cards: ICard[];
    cardsCount: number;
    canCreateCard: boolean
}

const ListSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        boardId: { type: mongoose.Types.ObjectId, ref: 'Board', required: true },
        canCreateCard: { type: Boolean, default: false }
    },
    { timestamps: true }
);

ListSchema.virtual("cards", {
    ref: "Card",
    localField: "_id",
    foreignField: "listId",
});

ListSchema.virtual("cardsCount", {
    ref: "Card",
    localField: "_id",
    foreignField: "listId",
    count: true
});

ListSchema.set('toJSON', { virtuals: true });
ListSchema.set('toObject', { virtuals: true });

export default ListSchema;

export const List = mongoose.model<IList>("List", ListSchema);
