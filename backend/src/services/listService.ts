import { List } from "../models/List";

export const createList = async (title: string, boardId: string) => {
    const newList = new List({
        title,
        boardId,
    });

    const savedList = await newList.save();
    return savedList;
};

export const findLists = async (filters: { boardId?: string }) => {
    return await List.find(filters).populate('cardsCount');
};

export const getListById = async (listId: string) => {
    return await List.findById(listId).populate('cardsCount');
};

export const updateList = async (listId: string, title: string) => {
    const updatedList = await List.findByIdAndUpdate(
        listId,
        { title },
        { new: true }
    );
    return updatedList;
};

export const deleteList = async (listId: string) => {
    return await List.findByIdAndDelete(listId);
};