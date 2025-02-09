import { List } from "../models/List";
import { ObjectId } from "mongoose";

export const createList = async (title: string, boardId: string) => {
    try {
        const newList = new List({
            title,
            boardId,
        });

        const savedList = await newList.save();

        return savedList;
    } catch (error) {
        throw new Error('Error creating list in the service');
    }
};

export const findLists = async (filters: { boardId?: string }) => {
    try {
        return await List.find(filters).populate('cardsCount');
    } catch (error) {
        throw new Error("Failed to fetch lists");
    }
};

export const getListById = async (listId: string) => {
    try {
        const list = await List.findById(listId).populate('cardsCount');
        if (!list) {
            throw new Error("List not found");
        }
        return list;
    } catch (error) {
        throw new Error("Failed to fetch list");
    }
};

export const updateList = async (listId: string, title: string) => {
    try {
        const updatedList = await List.findByIdAndUpdate(
            listId,
            { title },
            { new: true }
        );
        if (!updatedList) {
            throw new Error("List not found");
        }
        return updatedList;
    } catch (error) {
        throw new Error("Failed to update list");
    }
};

export const deleteList = async (listId: string) => {
    try {
        const deletedList = await List.findByIdAndDelete(listId);
        if (!deletedList) {
            throw new Error("List not found");
        }
        return deletedList;
    } catch (error) {
        throw new Error("Failed to delete list");
    }
};
