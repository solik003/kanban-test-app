import { Request, Response } from 'express';
import * as boardService from '../services/boardService'
import mongoose from 'mongoose';

export const createBoard = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const board = await boardService.createBoard(name);
        res.status(201).json(board);
    } catch (err: any) {
        res.status(500).json({ error: err.message || "Failed to create board" });
    }
};

export const getBoards = async (req: Request, res: Response) => {
    try {
        const boards = await boardService.getBoards();
        res.status(200).json(boards);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch boards" });
    }
};

export const getBoardById = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const board = await boardService.getBoardById(id);
        if (!board) {
            return res.status(404).json({ error: "Board not found" });
        }
        res.status(200).json(board);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch board by id" });
    }
};

export const updateBoard = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const updatedBoard = await boardService.updateBoard(id, name);
        if (!updatedBoard) {
            return res.status(404).json({ error: "Board not found" });
        }
        res.status(200).json(updatedBoard);
    } catch (err) {
        res.status(500).json({ error: "Failed to update board" });
    }
};

export const deleteBoard = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const deletedBoard = await boardService.deleteBoard(id);
        if (!deletedBoard) {
            return res.status(404).json({ error: "Board not found" });
        }
        res.status(200).json({ message: "Board deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete board" });
    }
};

