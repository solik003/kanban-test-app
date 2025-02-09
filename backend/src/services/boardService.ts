import { Board } from '../models/Board';
import { List } from '../models/List';

export const createBoard = async (name: string) => {
    try {
        if (!name) {
            throw new Error("Board name is required");
        }

        const board = new Board({
            name,
        });

        const savedBoard = await board.save();

        const lists = [
            new List({
                title: 'To-Do',
                boardId: savedBoard.id
            }),
            new List({
                title: 'In Progress',
                boardId: savedBoard.id
            }),
            new List({
                title: 'Done',
                boardId: savedBoard.id
            }),
        ];

        await List.insertMany(lists);

        return await Board.findById(savedBoard.id).populate('listsCount');
    } catch (error) {
        throw new Error("Failed to create board");
    }

};

export const getBoards = async () => {
    try {
        return await Board.find().populate('listsCount');
    } catch (error) {
        throw new Error("Failed to fetch boards");
    }
};


export const getBoardById = async (id: string) => {
    try {
        const board = await Board.findById(id).populate('lists');
        if (!board) {
            throw new Error("Board not found");
        }
        return board;
    } catch (error) {
        throw new Error("Failed to fetch board");
    }
};

export const updateBoard = async (id: string, name: string) => {
    try {
        if (!name) {
            throw new Error("Board name is required for update");
        }

        const updatedBoard = await Board.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedBoard) {
            throw new Error("Board not found");
        }

        return updatedBoard;
    } catch (error) {
        throw new Error("Failed to update board");
    }
};

export const deleteBoard = async (id: string) => {
    try {
        const deletedBoard = await Board.findByIdAndDelete(id);
        if (!deletedBoard) {
            throw new Error("Board not found");
        }
        return deletedBoard;
    } catch (error) {
        throw new Error("Error deleting board");
    }
};
