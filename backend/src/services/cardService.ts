import { Types } from "mongoose";
import { Card, ICard } from "../models/Card";

export const createCard = async (title: string, description: string, listId: string) => {
    const card = new Card({ title, description, listId });
    return await card.save();
};

export const getCardById = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid card id')
    }
    return await Card.findById(id);
};

export const findCards = async (filters: { listId?: string }, limit = 25, skip = 0) => {
    return await Card.find(filters).limit(limit).skip(skip);
};

export const updateCard = async (id: string, card: Partial<ICard>) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid card id')
    }
    return await Card.findByIdAndUpdate(
        id,
        card,
        { new: true }
    );
};

export const deleteCard = async (id: string) => {
    return await Card.findByIdAndDelete(id);
};
