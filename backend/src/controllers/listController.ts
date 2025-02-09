import { Request, Response } from "express";
import * as listService from "../services/listService";

export const createList = async (req: Request, res: Response) => {
    try {
        const { title, boardId } = req.body;

        if (!title || !boardId) {
            return res.status(400).json({ error: "Title and boardId are required" });
        }

        const list = await listService.createList(title, boardId);
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({ error: "Error creating list" });
    }
};

export const getLists = async (req: Request, res: Response) => {
    try {
        const filter: { boardId?: string } = {};

        const boardId = req.query.boardId || null;

        if (typeof boardId === "string") {
            filter.boardId = boardId;
        }

        const lists = await listService.findLists(filter);
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ error: "Error fetching lists" });
    }
};

export const getListById = async (req: Request, res: Response) => {
    try {
        const list = await listService.getListById(req.params.id);

        if (!list) {
            return res.status(404).json({ error: "List not found" });
        }

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ error: "Error fetching list" });
    }
};

export const updateList = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const updatedList = await listService.updateList(req.params.id, title);

        if (!updatedList) {
            return res.status(404).json({ error: "List not found" });
        }

        res.status(200).json(updatedList);
    } catch (error) {
        res.status(500).json({ error: "Error updating list" });
    }
};

export const deleteList = async (req: Request, res: Response) => {
    try {
        const deletedList = await listService.deleteList(req.params.id);

        if (!deletedList) {
            return res.status(404).json({ error: "List not found" });
        }

        res.status(200).json({ message: "List deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting list" });
    }
};
