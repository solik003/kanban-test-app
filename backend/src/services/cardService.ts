import { Card } from "../models/Card";

export const createCard = async (title: string, description: string, listId: string) => {
    try {
        const card = new Card({ title, description, listId });
        return await card.save();
    } catch (error) {
        throw new Error("Failed to create card");
    }
};

export const getCardById = async (id: string) => {
    try {
        return await Card.findById(id);
    } catch (err) {
        throw new Error("Error fetching cards by listId");
    }
};

export const findCards = async (filters: { listId?: string }, limit = 25, skip = 0) => {
    try {
        return await Card.find(filters).limit(limit).skip(skip);
    } catch (error) {
        throw new Error("Failed to fetch lists");
    }
};

export const updateCard = async (id: string, title: string, description: string) => {
    try {
        return await Card.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
    } catch (error) {
        throw new Error("Failed to update card");
    }
};

export const deleteCard = async (id: string) => {
    try {
        return await Card.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Failed to delete card");
    }
};
