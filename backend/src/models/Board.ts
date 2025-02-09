import mongoose, { Schema, Document } from "mongoose";

import { IList } from "./List";

export interface IBoard extends Document {
  name: string;
  lists: IList[];
  listsCount: number;
}

const BoardSchema = new Schema<IBoard>({
  name: { type: String, required: true },
}, { timestamps: true });

BoardSchema.virtual("lists", {
  ref: "List",
  localField: "_id",
  foreignField: "boardId",
});

BoardSchema.virtual("listsCount", {
  ref: "List",
  localField: "_id",
  foreignField: "boardId",
  count: true
});

BoardSchema.set('toJSON', { virtuals: true });
BoardSchema.set('toObject', { virtuals: true });

export const Board = mongoose.model<IBoard>("Board", BoardSchema);
