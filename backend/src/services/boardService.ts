import { Board } from '../models/Board';
import { List } from '../models/List';

export const createBoard = async (name: string) => {
    if (!name) {
        throw new Error("Board name is required");
    }

    const board = new Board({
        name
    });

    const savedBoard = await board.save();

    const lists = [
        new List({
            title: 'To-Do',
            boardId: savedBoard.id,
            canCreateCard: true
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
};

export const getBoards = async () => {
    return await Board.find().populate('listsCount');
};


export const getBoardById = async (id: string) => {
    return await Board.findById(id).populate('listsCount');
};

export const updateBoard = async (id: string, name: string) => {
    if (!name) {
        throw new Error("Board name is required for update");
    }
    const updatedBoard = await Board.findByIdAndUpdate(
        id,
        { name },
        { new: true }
    ).populate('listsCount');

    return updatedBoard;
};

export const deleteBoard = async (id: string) => {
    const deletedBoard = await Board.findByIdAndDelete(id);
    return deletedBoard;
};