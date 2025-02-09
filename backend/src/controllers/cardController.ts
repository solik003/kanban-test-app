import { Request, Response } from "express";
import * as cardService from "../services/cardService";
import { Card } from "../models/Card";


export const createCard = async (req: Request, res: Response) => {
    try {
        const { title, description, listId } = req.body;

        if (!title || !description || !listId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const savedCard = await cardService.createCard(title, description, listId);
        res.status(201).json(savedCard);
    } catch (error: any) {
        console.error("Error saving card:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getCardsById = async (req: Request, res: Response) => {
    try {
        const card = await cardService.getCardById(req.params.id);
        res.status(200).json(card);
    } catch (err) {
        res.status(500).json({ error: "Error fetching cards" });
    }
};

export const getCards = async (req: Request, res: Response) => {
    try {
        const filter: { listId?: string } = {};

        const listId = req.query.listId || null;

        if (typeof listId === "string") {
            filter.listId = listId;
        }

        const cards = await cardService.findCards(filter);
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: "Error fetching cards" });
    }
};


export const updateCard = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const updatedCard = await cardService.updateCard(req.params.id, title, description);

        if (!updatedCard) {
            return res.status(404).json({ error: "Card not found" });
        }
        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(500).json({ error: "Error updating card" });
    }
};


export const deleteCard = async (req: Request, res: Response) => {
    try {
        const deletedCard = await cardService.deleteCard(req.params.id);

        if (!deletedCard) {
            return res.status(404).json({ error: "Card not found" });
        }
        res.status(200).json({ message: "Card deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting card" });
    }
};
